import http from "http"
import { Server } from "socket.io";
import express from "express";
import { connectDB } from "./config/db.js"
import authRouter from "./routes/authRouter.js"
import errorHandler from "./middlewares/errorHandler.js";
import { createRoom, deleteRoom, getRoom } from "./socket/roomManager.js";
import { startGame } from "./game/gameEngine.js";


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
        const roomId = createRoom(user, socket.id)
        socket.join(roomId)
        socket.roomId = roomId
        callback({ success: true, room: roomId })
    })

    socket.on("room:join", (data, callback) => {
        const user = socket.user
        const roomId = data.roomId
        const room = getRoom(roomId)
        if (room.players.map(p => p.userId).includes(socket.id)) {
            throw Object.assign(new Error(`You already in this room`), { status: 400 })
        }
        if (room.players.length > 1 || room.status === "playing") {
            throw Object.assign(new Error(`Room number ${roomId} is already full`), { status: 400 })
        }
        room.players.push({
            userId: socket.id,
            username: user.username,
            color: "black"
        })
        socket.join(roomId)
        socket.roomId = roomId
        room.status = "playing"
        startGame(room.gameState)
        callback({ success: true, room: roomId })
        io.to(roomId).emit("room:state", room.gameState)
    })

    socket.on("game:move",)
    
    socket.on("disconnect", () => {
        deleteRoom(socket.roomId)
        io.to(socket.roomId).emit("room:closed")
    })
})

// {
//     board: initialBoard(),
//     currentPlayer: "white",
//     dice: [],
//     remainingDice: [],
//     bar: { white: 0, black: 0 },
//     borneOff: { white: 0, black: 0 },
//     status: "waiting-for-roll",
//     winner: null,
// }