FROM node:18-alpine
#COntainer is an instance, with a file system
#Well put everyhting in the app dir of file system
WORKDIR /app
#Image contains EVERYTHING needed to run a docker file

COPY package*.json ./
#calls npm install to install ALL dependencies

RUN npm install
#Also gotta copy everything from local file syste,

COPY . .
#need to expose localhost server
EXPOSE 3000
#Need to run cmd to run development

CMD npm run dev
#can either run build