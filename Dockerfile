FROM node:14.15.4-slim

RUN mkdir -p /usr/share/man/man1 &&\
    echo 'deb http://ftp.debian.org/debian stretch-backports main' | tee /etc/apt/sources.list.d/stretch-backports.list && \
    apt update && apt install -y \
    git \
    openjdk-11-jre

ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

USER node

WORKDIR /home/node/app

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]