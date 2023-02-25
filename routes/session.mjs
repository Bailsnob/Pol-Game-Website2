import express from "express"; //importing express for its router
import { randomUUID } from "crypto";
import Game from "../game/game.mjs";
//TO DO: build timer to close active sessions

const sessions = {};
const router = express.Router(); //session page's router

export function getSession(uuid) {
  return sessions[uuid];
}

class Session {
  constructor(uuid) {
    this.uuid = uuid;
    this.game = new Game(this);
  }
}

router.get("/", (req, res) => {
  const uuid = randomUUID();
  sessions[uuid] = new Session(uuid);
  res.json({ id: uuid });
});

export default router;
