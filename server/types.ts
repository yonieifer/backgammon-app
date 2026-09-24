export type ColorType = "black" | "white";

export type RoomType = {
    id: string;
    status: "waiting" | "playing" | "finished";
    ownerSocketId: string;
    players: { socketId: string; name: string; color: ColorType }[];
    game: GameStateType;
    rematchAcceptedBy: ColorType[];
};

export type GameStateType = {
    board: PointType[];
    currentPlayer: ColorType;
    dice: number[];
    remainingDice: number[];
    bar: { white: number; black: number };
    borneOff: { white: number; black: number };
    status: "waiting-for-roll" | "waiting-for-move" | "finished";
    winner: null | ColorType;
};

export type PointType = { owner: null | ColorType; checkers: number };

export type MoveType = { from: number | "bar"; to: number | "off"; die: number };
