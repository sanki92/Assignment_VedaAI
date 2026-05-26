import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { env } from "../config/env";
import { logger } from "../config/logger";

let io: Server | null = null;

const room = (id: string) => `assignment:${id}`;

export function initSocket(httpServer: HttpServer): Server {
  io = new Server(httpServer, {
    cors: { origin: env.CLIENT_URL, methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    socket.on("assignment:subscribe", (id: unknown) => {
      if (typeof id === "string") socket.join(room(id));
    });
    socket.on("assignment:unsubscribe", (id: unknown) => {
      if (typeof id === "string") socket.leave(room(id));
    });
  });

  logger.info("Socket.io initialized");
  return io;
}

export function emitAssignmentUpdate(id: string, payload: unknown): void {
  io?.to(room(id)).emit("assignment:update", payload);
}
