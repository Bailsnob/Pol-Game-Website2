/* Import express for its router. */
import express from "express";

/* Import getSession to retrieve / validate sessions by uuid strings. */
import { getSession } from "./session.mjs";

/**The "start" game router. */
const router = express.Router();

/* Listen for posts on the start route. */
router.post("/", (req, res) => {
  /* Validate the session. */
  const session = getSession(req.body.id);
  if (!session) {
    // TODO: BAD ID -- need to respond to request
    return;
  }

  /* TODO: think of illegal behavior to screen for */
  // if (session.game.isStarted) {
  //   // TODO: How to handle attempted restart of game? -- need to respond to req
  //   return;
  // }

  /* Start session's game with the provided arguments & send data to client. */
  session.game
    .guess(
      req.body.winnerGuess,
      req.body.dateGuess,
      req.body.marginGuess,)
    .then(({ type, data }) => {
      res.contentType(type);
      res.send(data);
    });
});

/* Export the "start" router. */
export default router;