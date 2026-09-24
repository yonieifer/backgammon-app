import express from "express";
import {createGameState} from "./game/board.js"

const app = express();

app.listen(process.env.PORT, () =>
    console.log(`server is up and listening on port ${process.env.PORT}`),
);

console.log(createGameState());
