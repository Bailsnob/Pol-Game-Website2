/* Import express for its router. */
import express from "express";

/* Import random unique user id ("uuid") generator from crypto. */
import { randomUUID } from "crypto";

/* Import Game to assign a new game instance to each new session. */
import Game from "../game/game.mjs";

// TO DO: build timer to close active sessions

/**Dictionary of all active sessions, keyed by uuid string. */
const sessions = {};

/**The "session" router. */
const router = express.Router();

/*******************************************************************************
 * Retrieve session associated with specific uuid.
 ******************************************************************************/
export function getSession(uuid) {
  return sessions[uuid];
}

/*******************************************************************************
 * Encapsulates a unique session.
 ******************************************************************************/
class Session {
  /**Constructs a new session. */
  constructor(uuid) {
    /**session's uuid */
    this.uuid = uuid;
    /**session's game instance */
    this.game = new Game(this);
  }
}

/* Listen for GET requests on the session route, and create a new session. */
router.get("/", (req, res) => {
  /* Generate a unique user id randomly. */
  const uuid = randomUUID();

  /* Store a new session by the uuid. */
  sessions[uuid] = new Session(uuid);

  /* Respond to the user by passing back the uuid via json. */
  res.json({ id: uuid });
});

/* Export the session router. */
export default router;
