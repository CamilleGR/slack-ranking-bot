const slack = require('slack')
const config = require('./config.js').data
const bot = slack.rtm.client()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const reacMng = require('./lib/reactionManager.js')
const winston = require('winston')
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
      reacMng.addReactionPoint(db,data.user,data.reaction)
      .then(function(userReactionAdded){
        winston.debug('ADD NEW REACTION '+data.reaction+' for user '+data.user+'\nsuccess ? '+userReactionAdded);
      })
      .catch(function(err){winston.log('ERROR',err)})
    })
  }
})

/*
bot.message(function(data){
console.log(data);
})
*/
