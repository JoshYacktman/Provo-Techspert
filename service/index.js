const cookieParser = require("cookie-parser");
const express = require("express");
const { startCronJobs } = require("./utils/cron");
const authRouter = require("./routes/auth");
const chatWebSocket = require("./routes/chat");

const app = express();

// Service configuration
console.log(process.argv.length);
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const build_loc = "public";

app.use(express.json());
app.use(cookieParser());
app.use(express.static(build_loc));

const apiRouter = express.Router();
app.use("/api", apiRouter);

// Authentication Routes
apiRouter.use("/auth", authRouter);

// Catch-all route
app.use((req, res) => {
  res.sendFile("index.html", { root: build_loc });
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

chatWebSocket(httpService);

startCronJobs();
