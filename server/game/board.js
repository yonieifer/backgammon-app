
export const initialBoard = () => {
    const board = Array.from({ length: 24 }, () => ({
        owner: null,
        checkers: 0,
    }));
    board[23] = { owner: "white", checkers: 2 };
    board[12] = { owner: "white", checkers: 5 };
    board[7] = { owner: "white", checkers: 3 };
    board[5] = { owner: "white", checkers: 5 };

    board[0] = { owner: "black", checkers: 2 };
    board[11] = { owner: "black", checkers: 5 };
    board[16] = { owner: "black", checkers: 3 };
    board[18] = { owner: "black", checkers: 5 };

    return board;
};

export function pointToIndex(point:number, color: ColorType) {
  return color === "white" ? point - 1 : 24 - point;
}

export function calculateDestination(from: number, die: number, color: ColorType) {
  return color === "white" ? from - die : from + die;
}

export function getBarDestination(die: number, color:ColorType) {
  return color === "white" ? 24 - die : die - 1;
}

export function distanceToExit(index: number, color: ColorType) {
  return color === "white" ? index + 1 : 24 - index;
}

