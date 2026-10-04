import bcrypt from "bcryptjs"
import { createUser, getUserByEmail } from "../DAL/user.dal.js"
import generateToken from "../utils/generateToken.js"

export const registerUser = async ({ email, password, username }) => {
    const userExists = await getUserByEmail(email)
    if (userExists) {
        throw Object.assign(new Error(`User ${email} already exists`), { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    await createUser({ username, email, hashedPassword })
    const token = generateToken(username, email)
    return { user: {username, email}, token }
}

export const userLogin = async ({ email, password, username }) => {
    const user = await getUserByEmail(email)
    if (!user) {
        throw Object.assign(new Error(`User ${email} not registered`), { status: 400 })
    }

    const isCorrectPassword = await bcrypt.compare(password, user.hashedPassword)
    if (!isCorrectPassword) {
        throw Object.assign(new Error(`Incorrect password`), { status: 400 })
    }

    const token = generateToken(username, email)
    return { user: {username, email}, token }
}

export const getUser = async ({ username, email }) => {
    const user = await getUserByEmail(email)
    if (!user) {
        throw Object.assign(new Error(`User ${email} not found`), { status: 404 })
    }
    return user
}