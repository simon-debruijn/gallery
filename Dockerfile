FROM node:20-alpine AS build

COPY . .

RUN apk update
RUN npm ci
RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN apk update && apk add --no-cache postgresql-client

COPY --from=build entrypoint.sh ./entrypoint.sh
COPY --from=build ./dist ./dist
COPY --from=build ./public ./public
COPY --from=build ./package.json ./package.json
COPY --from=build ./package-lock.json ./package-lock.json
COPY --from=build ./drizzle.config.ts ./drizzle.config.ts
COPY --from=build ./src/infra/persistence/db ./src/infra/persistence/db

RUN npm ci --omit=dev
RUN npm i tsx drizzle-kit --no-save

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE $PORT

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]