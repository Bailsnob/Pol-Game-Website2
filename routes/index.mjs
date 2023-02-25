import express from "express"; //importing express for its router
const router = express.Router(); //index page's router

router.use(express.static(process.cwd() + "/public")); //cwd = current working directory (where node was launched from)

export default router;
// TO DO: find out why we are calling next on a string