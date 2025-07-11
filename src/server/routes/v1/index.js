import { Router } from "express";
import errorHandler from "strong-error-handler";
import contactRoutes from "./contact.route.js";
import taskRoutes from "./task.route.js";
import projectRoutes from "./project.route.js";

const router = Router();

router.use("/contact", contactRoutes);
router.use("/task", taskRoutes);
router.use("/project", projectRoutes);

/**
 * GET /health
 * Health check endpoint.
 */
router.get("/health", (req, res) => {
  res.send("Ok");
});

// Error handling middleware
router.use(
  errorHandler({
    debug: process.env.ENV !== "prod",
    log: true,
  })
);

export default router;
