# build angular+node app
FROM node:18.17.0-alpine as build
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build --prod

# nginx
FROM nginx:alpine
COPY /nginx.conf /etc/nginx/config/nginx.conf
COPY --from=build /app/dist/technotronics-front /usr/share/nginx/html
CMD sed -i "s/http:\/\/localhost:4200/$BASE_API_URL/g" /usr/share/nginx/html/main.*.js && nginx -c /etc/nginx/config/nginx.conf -g 'daemon off;'