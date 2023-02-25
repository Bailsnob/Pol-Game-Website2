import express from "express"; //importing express for server and built in json parser;
// we don't need to write the file path in this case because we are taking it from node_modules
import indexRouter from "./routes/index.mjs";
import sessionRouter from "./routes/session.mjs";
import startRouter from "./routes/start.mjs";

const PORT = 3000; //port on which server shall listen
const app = express(); // this is the express server application

app.use(express.json());

app.use("/", indexRouter);
app.use("/start", startRouter);
app.use("/session", sessionRouter);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));