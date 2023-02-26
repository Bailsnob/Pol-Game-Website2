/* Import express for its server and built-in json parser.

   Note: File path to express is not necessary here, because the module was 
   installed into the node_modules folder.
*/
import express from "express";

/* Import routes for direction of traffic by url paths. */
import indexRouter from "./routes/index.mjs";
import sessionRouter from "./routes/session.mjs";
import startRouter from "./routes/start.mjs";

/**Port on which the server will listen. */
const PORT = 3000;

/**The express server application. */
const app = express();

/* Middleware to pre-parse Content-Type:json; appends key-values to body. */
app.use(express.json());

/* Activate the various routes as middleware to divert traffic into modules. */
app.use("/", indexRouter);
app.use("/session", sessionRouter);
app.use("/start", startRouter);

/* Start the server listening on the specified port. */
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
