# slack-ranking-bot
Bot who assign rank and make statistics on messages and reactions posted on your slack's team. For now, you can askthings to the bot thanks to some commands who are detected by a regex defined in lib/commands.
I personnaly deploy the bot in production on a VPS with UBUNTU server 16.04, 1 vCore and 2GB RAM and it work correctly ;)

# Cron jobs

You can create a folder named "cronJobs" who contain js scripts. These scripts has to implemente an execute function that will be executed by a cron (see config.js file below).

## Install the bot

The bot require a mongodb database and a config file described in the following codeblock. You've to create a config file config.js in the root directory with the following structure :

```
exports.data = {
  slackToken : slack_token,
  botName : 'cheo',
  dbUrl : mongodb://db:27017/cheo,
  listenedChannels : ['id1',
                      'id2'],
  cronJobs : [{"cronExpression" : "* * * * *", "scriptName":"sayHello.js"}]
}
```

you have to define the attribute cronJobs. This is an array object with the cronExpression, and the name of the script to execute.


# Build the docker image

docker-compose build

# Run the container

docker-compose up
