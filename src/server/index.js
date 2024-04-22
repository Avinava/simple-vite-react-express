import * as dotenv from "dotenv";
import path from "path";
import { default as cors, default as express } from "express";
import { errors } from "celebrate";
import { createClient } from "redis";
import http from "http";
import routes from "./routes/v1/index.js";

dotenv.config();

const client = createClient();
client.connect().catch(console.error);

const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(errors());
const httpServer = http.createServer(app);

// setup routes
app.use("/api/v1/", routes);
app.get("/", (req, res) => {
  res.redirect("http://localhost:3000");
});

// need this for react router to work
app.get("*", (req, res) => res.sendFile(path.resolve("dist", "index.html")));
httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
