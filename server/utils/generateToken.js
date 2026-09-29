import jwt from "jsonwebtoken";
import { ka } from "zod/v4/locales";

export default ({ username, email }) => {
    const payload = {username, email}
    const token = jwt.sign(payload, process.env.JWT_KEY, {expiresIn: "7h"})
    return token
}
