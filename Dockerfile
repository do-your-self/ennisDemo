FROM nginx
MAINTAINER JianyingLi <lijy91@foxmail.com>

RUN apt-get update && apt-get install -y sudo curl bzip2 git vim gnupg
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -y nodejs && apt-get clean
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log
COPY ./nginx /etc/nginx
WORKDIR /app
COPY . /app/
RUN cnpm install
RUN npm run build

RUN cp -R /app/dist/*  /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]