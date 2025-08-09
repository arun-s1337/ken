import Router from "express"

import { loginUserController} from "../../controller/user-login.js"

const router = Router()

router.post("/login", loginUserController);

export default router;