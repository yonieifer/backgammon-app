import express from "express"
import validateBody from "../middlewares/validateBody.js"
import { loginSchema } from "../validations/auth.schemas.js"
import { register } from "../controllers/auth.controllers.js"


const router = express.Router()

router.post("/register", validateBody(loginSchema), register)


export default router