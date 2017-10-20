FROM node:6.11.4
MAINTAINER hdhuang <kaungmsn@gmail.com>
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
WORKDIR /usr/src/app
ADD . /usr/src/app
RUN cnpm install
RUN npm run build
EXPOSE 8000
CMD [ "npm", "start" ]