FROM node:6.11.4
MAINTAINER hdhuang <kaungmsn@gmail.com>

ADD package.json /tmp/package.json
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cd /tmp && cnpm install 
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN npm run build
RUN rm -rf ./test
RUN rm -rf ./src
EXPOSE 8000
CMD [ "npm", "start" ]