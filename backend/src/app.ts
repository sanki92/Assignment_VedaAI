import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { logger } from "./config/logger";
import assignmentRoutes from "./routes/assignment.routes";
import { notFound, errorHandler } from "./middleware/error";

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CLIENT_URL }));
  app.use(express.json({ limit: "1mb" }));
  app.use(pinoHttp({ logger }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(
    "/api",
    rateLimit({ windowMs: 60_000, max: 60, standardHeaders: true })
  );
  app.use("/api/assignments", assignmentRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
