FROM node:18-alpine3.17
WORKDIR /app
COPY package*.json ./
RUN npm install pm2 -g
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production
RUN ls -al -R
COPY . .
EXPOSE 3838 3000
ENV NODE_ENV production
CMD [ "npm", "start" ]
