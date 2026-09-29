import { registerUser } from "../services/user.service.js"

export const register = async (req, res) => {
    const data = await registerUser(req.body)
    res.status(201).json({ success: true, data })
}