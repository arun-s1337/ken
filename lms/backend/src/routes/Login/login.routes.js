import express from "express"
import { loginController,createAdminUser } from "../../controller/Login/login.controller.js"

const router = express.Router()

router.post('/login',loginController)
router.post('/register',createAdminUser)


export default router