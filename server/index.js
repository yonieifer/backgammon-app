import http from "http"
import { Server } from "socket.io";
import express from "express";
import { connectDB } from "./config/db.js"
import authRouter from "./routes/authRouter.js"
import errorHandler from "./middlewares/errorHandler.js";
import{ createRoom } from "./socket/roomManager.js";


const app = express();
const httpServer = http.createServer(app)
const io = new Server(httpServer)

await connectDB()

app.use(express.json())
app.use(authRouter)
app.use(errorHandler)

app.listen(process.env.PORT, () =>
    console.log(`server is up and listening on port ${process.env.PORT}`),
);

io.on("connection", (socket) => {
    socket.on("room:create", (callback) => {
        const user = socket.user
        const roomId = createRoom(user)
        socket.join(roomId)
        callback({success: true, data: {roomId}})
    })

    socket.on("room:join", (data, callback) => {
        const user = socket.user
        const roomId = data.roomId
        
    })
    socket.on("game:move",)
    socket.on("disconnect")
})