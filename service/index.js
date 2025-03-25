const cookieParser = require("cookie-parser");
const express = require("express");
const { startCronJobs } = require("./utils/cron");
const authRouter = require("./routes/auth");
const chatRouter = require("./routes/chat");

const app = express();

// Service configuration
const port = process.argv.length > 2 ? process.argv[2] : 3000;
const build_loc = process.argv.length > 2 ? "public" : "../dist";

app.use(express.json());
app.use(cookieParser());
app.use(express.static(build_loc));

const apiRouter = express.Router();
app.use("/api", apiRouter);

// Authentication Routes
apiRouter.use("/auth", authRouter);

// Chat Routes
apiRouter.use("/chat", chatRouter);

// Catch-all route
app.use((req, res) => {
  res.sendFile("index.html", { root: build_loc });
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

startCronJobs();
