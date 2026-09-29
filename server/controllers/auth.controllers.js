import { getUser, registerUser, userLogin } from "../services/user.service.js"

export const register = async (req, res) => {
    const data = await registerUser(req.body)
    res.status(201).json({ success: true, data })
}

export const login = async (req, res) => {
    const data = await userLogin(req.body)
    res.status(201).json({ success: true, data })
}

export const getUserProfile = async (req, res) => {
    const user = req.user
    const data = await getUser(user)
    res.json({ success: true, data })
}