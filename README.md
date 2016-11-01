# slack-ranking-bot
Bot who assign rank and make statistics on messages and reactions posted on your slack's team.

## Install the bot

to install the bot, you have to create a config.js file in the root directory :
'''
exports.data = {
  slackToken : slack_token,
  botName : 'cheo',
  dbUrl : database_ip,
  listenedChannels : ['id1',
                      'id2',
                      ]
}
'''
