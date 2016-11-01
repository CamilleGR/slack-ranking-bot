var slack = require('slack')
var config = require('./config.js').data
var bot = slack.rtm.client()
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var reacMng = require('./lib/reactionManager.js')


bot.listen({token:config.slackToken});


bot.reaction_added(function(data){
  console.log(data);
  reacMng.isReactionExist(db,data.reaction)
    .then(function(test){
      console.log("data.reaction exist :"+test)

    })
    .catch(function(err){console.log(err)})
})



/*
bot.message(function(data){
  console.log(data);
})
*/
