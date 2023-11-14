FROM node:20-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY tsconfig*.json ./
COPY app ./app
COPY documentation ./documentation
RUN npm run build
CMD [ "npm", "run", "start" ]
