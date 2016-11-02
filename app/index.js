const slack = require('slack')
const config = require('../config.js').data
const bot = slack.rtm.client()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const reacMng = require('../lib/reactionManager.js')
const winston = require('winston')
const commands = require('../lib/commands.js')
winston.level = process.env.LOG_LEVEL


bot.listen({token:config.slackToken});


bot.reaction_added(function(data){
  if(config.listenedChannels.indexOf(data.item.channel)<0){
    winston.debug('REACTION CATCHED IN UNLISTENNED CHANNEL')
  }
  else
  {
    MongoClient.connect(config.dbUrl, function(err, db) {
      winston.debug('NEW REACTION CATCHED IN A LISTENED CHANNEL')
      assert.equal(err,null)
      reacMng.addReactionPoint(db,data.reaction,data.item_user)
      .then(function(userReactionAdded){
        winston.debug('ADD NEW REACTION '+data.reaction+' for user '+data.user+'\nsuccess ? '+userReactionAdded);
      })
      .catch(function(err){winston.log('ERROR',err)})
    })
  }
})



//When you send a mesage to cheo
bot.message(function(data,err){
    var matches = commands.regex_stat.exec(data.text)
    if(matches !== null && matches[0] !== ''){

      if(matches[2]==='emoji')
          MongoClient.connect(config.dbUrl, function(err, db) {
            reacMng.getReaction(db,matches[3]).then(function(reaction){
              slack.chat.postMessage(
                  {token:config.slackToken, channel:data.channel, text:JSON.stringify(reaction), as_user:true}
                  , function(err,data){
                    winston.error(err)
                    winston.debug(data)
                  })
            })
          })
        }
})
