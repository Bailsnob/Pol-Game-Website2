import express from "express"; //importing express for its router
import getSession from "./session.mjs";
const router = express.Router(); //start page's router

router.post("/", (req, res) => {
  console.log("+++++++++++++++++++++++++++++++");
  console.log("posting on start");
  const session = getSession(req.body.id);
  if (!session) {
    //TO DO: need to respond to bad reqs
    return;
  }
  if (session.game.isStarted) {
    //TO DO: need to handle this error
    return;
  }
  console.log("+++++++++++++++++++++++++++");
  console.log(session.game.start(0, 1));
  // session.game
    // .start(req.body.minYear, req.body.maxYear)
    // .then(({ type, data }) => {
    //   res.contentType(type);
    //   res.send(data);
    // });
});

export default router;
