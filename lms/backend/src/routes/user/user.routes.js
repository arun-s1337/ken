import express from "express";
import { checkUserPaymentStatus, composeMessage, getAllMessage, getAllUsers, getModuleCompletion, getModuleCompletionForCertificate, getUserAssessmentLogs, getUserById, getUserWorkHours, updateUserProfile, userPaymentVerification,createFeedback,getAllFeedbacks} from "../../controller/User/user.controller.js";
import upload from "../../middleware/multer-config.js";

const router = express.Router();

router.get('/getallusers',getAllUsers)
router.get("/user/:id", getUserById);
router.get('/userworkhour/:id',getUserWorkHours)
router.get("/assessment-logs/:user_id",getUserAssessmentLogs)
router.get('/paymentstatus/:id',checkUserPaymentStatus)
router.post('/composemessage',composeMessage)
router.get('/getallmsg/:id',getAllMessage)
router.post('/updateprofile/:id',upload.single("profile_image"),updateUserProfile)
router.get('/payverify/:id',userPaymentVerification)
router.get("/grade/:userId",getModuleCompletion)
router.get("/gradecertificate/:user_id",getModuleCompletionForCertificate)
router.post("/feedback",createFeedback)
router.get("/feedback",getAllFeedbacks)

export default router;
