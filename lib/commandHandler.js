const commands = require('./lib/commands.js')
const config = require('../config.js').data
const MongoClient = require('mongodb').MongoClient
const slack = require('slack')


var handler = function handler(data){
  var matches;
  switch(true){
    case commands.regex_stat.test(data.text) :
      matches = commands.regex_stat.exec(data.text)
      if(matches[2]==='emoji') emojiStats(matches[3], data.channel)
    break;

  }
}

function emojiStats(emojiName, channel){
  MongoClient.connect(config.dbUrl, function(err, db) {
    reacMng.getReaction(db,emojiName).then(function(reaction){
      slack.chat.postMessage(
          {token:config.slackToken, channel:channel, text:JSON.stringify(reaction), as_user:true}
          , function(err,data){
            winston.error(err)
            winston.debug(data)
          })
    })
  })
}


module.exports = {
                    handler: handler
                  }
