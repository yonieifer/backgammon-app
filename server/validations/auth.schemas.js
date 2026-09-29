import {z} from "zod"

export const loginSchema = z.object({
    username: z.string(),
    email: z.email(),
    password: z.string().min(6)
})
