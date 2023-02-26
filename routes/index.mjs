/* Import express for its router and static server features. */
import express from "express";

/**The index (or "home") page router. */
const router = express.Router();

/* Use express's static server to serve static files from public folder.

   Note: process.cwd() obtains the current working directory, which is where
   node was launched (as opposed to the directory where this particular file is
   located.)
*/
router.use(express.static(process.cwd() + "/public"));

/* Export the home router. */
export default router;
