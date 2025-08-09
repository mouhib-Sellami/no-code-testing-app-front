FROM node:20 AS build

ENV APP_PREFIX="VITE_"
ENV ASSET_DIR="/usr/share/nginx/html"

WORKDIR /app

COPY package*.json ./

# COPY .env ./.env

COPY .env.production ./.env.production

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=build /app/dist /usr/share/nginx/html
COPY conf/nginx.conf /etc/nginx/nginx.conf

EXPOSE 88

COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]