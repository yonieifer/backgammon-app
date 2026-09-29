import { Chance } from "chance";
import { initialBoard, pointToIndex } from "./board.js";

export const createGameState = () => ({
    board: initialBoard(),
    currentPlayer: "white",
    dice: [],
    remainingDice: [],
    bar: { white: 0, black: 0 },
    borneOff: { white: 0, black: 0 },
    status: "waiting-for-roll",
    winner: null,
});

const rollDice = () => {
    const chance = new Chance();
    const dice = chance.integer({ min: 1, max: 6 });
    return dice;
};

const makeMove = (move: MoveType, state: GameStateType, color: ColorType) => {
    const board =  [...state.board ];
    const remainingDice = [...state.remainingDice];
    const bar = { ...state.bar };
    const borneOff = { ...state.borneOff };

    const dieIdx = remainingDice.findIndex((d) => d === move.die);
    remainingDice.splice(dieIdx, 1);

    if (move.from === "bar") {
        bar[color] -= 1;
    } else {
        const fromIdx = pointToIndex(move.from, color);
        const fromPoint = { ...board[fromIdx]! };
        fromPoint.checkers -= 1;
        if (fromPoint.checkers === 0) {
            fromPoint.owner = null;
        }
        board[fromIdx] = fromPoint;
    }

    if (move.to === "off") {
        borneOff[color] += 1;
    } else {
        const toIdx = pointToIndex(move.to, color);
        const toPoint = { ...board[toIdx]! };
        if (toPoint.owner !== color && toPoint.owner !== null) {
            bar[toPoint.owner] += 1;
            toPoint.owner = color;
            toPoint.checkers = 1;
        } else {
            toPoint.checkers += 1;
            board[toIdx] = toPoint;
        }
        board[toIdx] = toPoint;
    }
    return {
        ...state,
        board,
        remainingDice,
        bar,
        borneOff,
    };
};
