import { createGameState } from "../game/gameEngine.js"

const roomsDB = new Map()

export const createRoom = (user, userId) => {
    const roomId = randomUUID()
    const room = {
        id: roomId,
        status: "waiting",
        players: [
            {
                userId: userId,
                username: user.username,
                color: "white"
            },
        ],
        gameState: createGameState()
    }
    roomsDB.set(roomId, room)
    return roomId
}

export const getRoom = (roomId) => {
    const room = roomsDB.get(roomId)
    return room
}

export const updateRoom = (updatedRoom) => {
    roomsDB[updatedRoom.id] = updatedRoom
}

export const deleteRoom = (roomId) => {
    roomsDB.delete(roomId)
}
