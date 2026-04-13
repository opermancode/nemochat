FROM node:18-slim
WORKDIR /app

# Copy the file explicitly
COPY package.json ./

# If you have a lockfile, copy it too (optional but recommended)
# COPY package-lock.json ./ 

RUN npm install

# Copy the rest of the source code
COPY . .

EXPOSE 5000
CMD ["node", "src/app.js"]