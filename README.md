# slack-ranking-bot
Bot who assign rank and make statistics on messages and reactions posted on your slack's team.

## Install the bot

The bot require a mongodb database.

* create a config.js file in the root directory
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

* Without normal logging
```
node app/index.js
```
