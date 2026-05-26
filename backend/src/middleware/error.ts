import type { Request, Response, NextFunction } from "express";
import { logger } from "../config/logger";

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: "NotFound" });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const message = err instanceof Error ? err.message : "Unknown error";
  logger.error({ err: message }, "Unhandled error");
  res.status(500).json({ error: "InternalServerError" });
}
