import { Router } from "express";
import { handleAdminLogin } from "../../controller/admin-login.js";
import { authenticateToken } from "../../middleware/authmiddleware.js";

const router = Router();

router.post("/login",handleAdminLogin)


export default router