import express from "express";
import { connectDB } from "./config/db.js"
import authRouter from "./routes/authRouter.js"


const app = express();

await connectDB()

app.use(express.json())

app.use(authRouter)

app.listen(process.env.PORT, () =>
    console.log(`server is up and listening on port ${process.env.PORT}`),
);