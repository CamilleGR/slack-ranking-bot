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


bot.reaction_added((data) => {
  if(data.item.channel == null && config.listenedChannels.indexOf(data.item.channel)<0){
    winston.debug('REACTION_ADDED CATCHED IN UNLISTENNED CHANNEL')
  }
  else
  {

    MongoClient.connect(config.dbUrl, (err, db) =>{
      if(err != null){
        winston.error(err)
        return;
      }
      winston.debug('NEW REACTION CATCHED IN A LISTENED CHANNEL')
      assert.equal(err,null)
      if(data.user!==data.item_user){
        reacMng.addReactionPoint(db,data.reaction,data.item_user)
        .then((userReactionAdded)=>{
          winston.debug('ADD NEW REACTION '+data.reaction+' for user '+data.item_user+'\nsuccess ? '+userReactionAdded);
        })
        .catch((err)=>{winston.log('ERROR',err)})
      }
    })
  }
})

bot.reaction_removed((data) =>{
  if(data.item.channel == null && config.listenedChannels.indexOf(data.item.channel)<0){
    winston.debug('REACTION_REMOVED CATCHED IN UNLISTENNED CHANNEL')
  }
  else
  {
    MongoClient.connect(config.dbUrl, (err, db) =>{
      if(err != null){
        winston.error(err)
        return;
      }
      winston.debug('NEW REACTION REMOVED CATCHED IN A LISTENED CHANNEL')
      assert.equal(err,null)

        if(data.item_user!==data.user){
          reacMng.decReactionPoint(db,data.reaction,data.item_user)
          .then((reactionPointDec)=>{
          winston.debug('DEC REACTION '+data.reaction+' for user '+data.item_user+'\nsuccess ? '+reactionPointDec);
          })
          .catch((err)=>{winston.log('ERROR',err)})
        }

    })
  }
})


//When you send a mesage to cheo
bot.message((data,err) => {
  if(data != null && data.text != null){
    if(data.text.indexOf('cheo')===0 || data.text.indexOf('Cheo') === 0) commandHandler.handler(data)
    }
    else{
       winston.warn("Message with no data.text has been captured")
     }
})
