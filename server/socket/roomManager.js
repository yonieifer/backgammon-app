import { createGameState } from "../game/gameEngine"

const roomsDB = new Map()

export const createRoom = (user) => {
    const roomId = randomUUID()
    const room = {
        id: roomId,
        status: "waiting",
        players: [
            {
                userId: user.id,
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

export const updateRoom = () => {}

export const deleteRoom = (roomId) => {
    roomsDB.delete(roomId)
}
