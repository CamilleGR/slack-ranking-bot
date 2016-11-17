# slack-ranking-bot
Bot who assign rank and make statistics on messages and reactions posted on your slack's team. For now, you can askthings to the bot thanks to some commands who are detected by a regex defined in lib/commands.
I personnaly deploy the bot in production on a VPS with UBUNTU server 16.04, 1 vCore and 2GB RAM and it work correctly ;)

## Install the bot

The bot require a mongodb database and a config file described in the following codeblock. You've to create a config file config.js in the root directory with the following structure :

```
exports.data = {
  slackToken : slack_token,
  botName : 'cheo',
  dbUrl : mongodb://db:27017/cheo,
  listenedChannels : ['id1',
                      'id2']
}
```
# Build the docker image

docker-compose build

# Run the container

docker-compose up
