# Install dependencies only when needed
# Stage 0
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json ./
RUN npm install
#############################################

# Rebuild the source code only when needed
# Stage 1
FROM node:20-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npm run build
#############################################

# Production image, copy only production files
# Stage 2
FROM node:20-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/next.config.mjs /app/public /app/.next /app/node_modules /app/package.json ./


EXPOSE 3000

CMD ["npm", "start"]
#############################################