#!/bin/bash
cd config
git pull
cd ..
git pull
docker stop $(docker ps -a -q)
docker run -p 27017:27017 -d --name db mongo --auth
docker build -t slack-ranking-bot .
docker run $1 --link db:db  slack-ranking-bot 

