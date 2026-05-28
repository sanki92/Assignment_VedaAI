FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
RUN npm ci --workspace=backend --include-workspace-root --ignore-scripts
COPY backend ./backend
RUN npm run build -w backend

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
RUN npm ci --omit=dev --workspace=backend --include-workspace-root --ignore-scripts
COPY --from=builder /app/backend/dist ./backend/dist
EXPOSE 4000
CMD ["node", "backend/dist/index.js"]
