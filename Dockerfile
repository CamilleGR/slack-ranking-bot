FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
#COPY package.json /usr/src/app
#RUN npm install

# Bundle app source
COPY . /usr/src/app
RUN npm config get proxy
RUN npm config get https-proxy
RUN npm install
CMD [ "npm", "start" ]

