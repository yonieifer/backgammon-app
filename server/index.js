import express from "express";
import authRouter from "./routes/authRouter.js"


const app = express();

app.use(authRouter)

app.listen(process.env.PORT, () =>
    console.log(`server is up and listening on port ${process.env.PORT}`),
);