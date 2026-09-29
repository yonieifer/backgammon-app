import express from "express"
import validateBody from "../middlewares/validateBody.js"
import { loginSchema } from "../validations/auth.schemas.js"
import { login, register } from "../controllers/auth.controllers.js"


const router = express.Router()

router.post("/register", validateBody(loginSchema), register)

router.post("/login", validateBody(loginSchema), login)

export default router
