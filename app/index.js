const slack = require('slack')
const config = require('../config.js').data
const bot = slack.rtm.client()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const reacMng = require('../lib/reactionManager.js')
const winston = require('winston')
const commandHandler = require('../lib/commandHandler.js')
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
        winston.debug('ADD NEW REACTION '+data.reaction+' for user '+data.item_user+'\nsuccess ? '+userReactionAdded);
      })
      .catch(function(err){winston.log('ERROR',err)})
    })
  }
})



//When you send a mesage to cheo
bot.message(function(data,err){
  if(data.text.startWith('cheo') || data.text.startWith('Cheo'))
  if(data !== null && err === null) commandHandler.handler(data)
  else winston.error(err)
})
