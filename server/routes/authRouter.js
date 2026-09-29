import express from "express"
import validateBody from "../middlewares/validateBody.js"
import { loginSchema } from "../validations/auth.schemas.js"
import { getUserProfile, login, register } from "../controllers/auth.controllers.js"
import authJWT from "../middlewares/authJWT.js"


const router = express.Router()

router.post("/register", validateBody(loginSchema), register)

router.post("/login", validateBody(loginSchema), login)

router.get("/user-profile", authJWT, getUserProfile)

export default router
