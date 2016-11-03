# slack-ranking-bot
Bot who assign rank and make statistics on messages and reactions posted on your slack's team. For now, you can askthings to the bot thanks to some commands who are detected by a regex defined in lib/commands.
I personnaly deploy the bot in production on a VPS with 1 vCore and 2GB RAM and it work correctly ;)

## Install the bot

The bot require a mongodb database and a config file described in the following codeblock. You've to create a config file config.js in the root directory with the following structure :

```
exports.data = {
  slackToken : slack_token,
  botName : 'cheo',
  dbUrl : database_ip,
  listenedChannels : ['id1',
                      'id2']
}
```
* install with npm
```
npm install
```

## Start the bot

* With DEBUG logs
```
npm start
```

* Start bot in production
```
nohup node app/index.js &
```
