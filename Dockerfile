FROM node:14-slim
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
ENV NODE_ENV=production
COPY . .
CMD ["npm", "start"]
