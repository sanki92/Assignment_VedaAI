import http from "http";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { connectDb, disconnectDb } from "./config/db";
import { createApp } from "./app";
import { initSocket } from "./ws/socket";
import { startGenerationWorker } from "./workers/generation.worker";

async function main() {
  await connectDb();

  const app = createApp();
  const server = http.createServer(app);
  initSocket(server);
  const worker = startGenerationWorker();

  server.listen(env.PORT, () => {
    logger.info(`Server listening on port ${env.PORT}`);
  });

  const shutdown = async () => {
    logger.info("Shutting down");
    await worker.close();
    server.close();
    await disconnectDb();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

main().catch((err) => {
  logger.error({ err }, "Fatal startup error");
  process.exit(1);
});
