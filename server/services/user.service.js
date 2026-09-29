import bcrypt from "bcryptjs"
import { createUser, getUserByEmail } from "../DAL/user.dal.js"
import generateToken from "../utils/generateToken.js"

export const registerUser = async ({email, password, username}) => {
    const userExists = await getUserByEmail(email)
    if (userExists) {
        throw Object.assign(new Error(`user ${email} already exists`), {status: 409})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await createUser({username, email, hashedPassword})
    const token = generateToken(username, email)
    return {user, token}
}