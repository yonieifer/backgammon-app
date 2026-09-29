import { z, ZodError } from "zod"
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"

export default (err, req, res, next) => {
    if (err instanceof ZodError) {
        return res.status(400).json({ success: false, message: z.treeifyError(err) });
    }

    if (err instanceof JsonWebTokenError) {
        return res.status(401).json({ success: false, message: "Invalid authentication token" });
    }

    if (err instanceof TokenExpiredError) {
        return res.status(401).json({ success: false, message: "Token expired, please log in again" });

    }
    const status = err.status || 500
    const message = err.message || "server internal error"
    res.status(status).json({ success: false, message })
}