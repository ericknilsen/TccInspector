FROM node:10


WORKDIR /home/node/app

COPY package.json .

RUN wget www.globo.com
RUN npm install
COPY . .
#CMD ["yarn run", "dev-server"]

