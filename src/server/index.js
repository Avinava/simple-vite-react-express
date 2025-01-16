import * as dotenv from "dotenv";
import path from "path";
import { default as cors, default as express } from "express";
import { errors } from "celebrate";
import http from "http";
import routes from "./routes/v1/index.js";
import { securityMiddleware, requestLogger } from "./middleware/security.js";

dotenv.config();

const app = express();

// Apply security middleware
app.use(securityMiddleware);
app.use(requestLogger);
app.use(express.json());

app.use(cors());
app.use(express.static("dist"));
app.use(errors());
const httpServer = http.createServer(app);

// setup routes
app.use("/api/v1/", routes);

/**
 * Redirect root URL to the frontend application.
 */
app.get("/", (req, res) => {
  res.redirect("http://localhost:3000");
});

/**
 * Serve the frontend application for any other route.
 * This is necessary for React Router to work.
 */
app.get("*", (req, res) => res.sendFile(path.resolve("dist", "index.html")));

// Improved error handling
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "development" ? err.message : "An unexpected error occurred",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
