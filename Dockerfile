FROM ubuntu:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    vim \
    git \
    curl \
    nodejs \
    npm \
    locales

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
ENV TERM xterm-256color

RUN echo "PS1='\\[\\e[01;32m\\]\\u\\[\\e[00m\\]@\\[\\e[01;34m\\]\\h\\[\\e[00m\\]:\\w\\\\$ '" >> /root/.bashrc

WORKDIR /app

CMD ["/bin/bash"]

