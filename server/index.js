import express from "express";
import validateBody from "./middlewares/validateBody.js";
import { loginSchema } from "./validations/auth.schemas.js";
import { register } from "./services/user.service.js";


const app = express();

app.post("/register", validateBody(loginSchema), async (req, res) => {
    const data = await register(req.body)
    res.status(201).json({ success: true, data })
})

app.listen(process.env.PORT, () =>
    console.log(`server is up and listening on port ${process.env.PORT}`),
);