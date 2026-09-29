import jwt from "jsonwebtoken";

export default (username, email) => {
    const payload = { username, email }
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7h" })
    return token
}
