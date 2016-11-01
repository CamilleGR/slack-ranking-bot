var slack = require('slack')
var config = require('../config.js').data
var bot = slack.rtm.client()
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var reacMng = require('../lib/reactionManager.js')



MongoClient.connect(config.dbUrl, function(err, db) {
  assert.equal(err,null);
  reacMng.isReactionExist(db,"partyparrot")
    .then(function(test){console.log("partyparrot = "+test)})
    .catch(function(err){console.log(err)})
  reacMng.isUserReactionExist(db,"partyparrot","camille")
  .then(function(test){console.log("partyparrot.scores.camille = "+test)})
  .catch(function(err){console.log(err)})
  reacMng.isUserReactionExist(db,"moustache","camille")
  .then(function(test){console.log("moustache.scores.camille = "+test)})
  .catch(function(err){console.log(err)})
  reacMng.addReaction(db,"partyparrot")
  .then(function(test){console.log("addReaction(partyparrot)= "+test)})
  .catch(function(err){console.log(err)})
  reacMng.addUserReaction(db,"partyparrot","camille")
  .then(function(test){console.log("addUserReaction(partyparrot,camille)= "+test)})
  .catch(function(err){console.log(err)})
  reacMng.decReactionPoint(db,"partyparrot","camille")
  .then(function(test){console.log("removeUserReaction(partyparrot,camille)= "+test)})
  .catch(function(err){console.log(err)})
  reacMng.incReactionPoint(db,"partyparrot","camille")
  .then(function(test){console.log("removeUserReaction(partyparrot,camille)= "+test)})
  .catch(function(err){console.log(err)})
  reacMng.getReaction(db,"partyparrot")
  .then(function(test){console.log("getReaction(partyparrot)= ", test)})
  .catch(function(err){console.log(err)})

  reacMng.addReactionPoint(db,'vnr','borey')
  .then(function(test){console.log('Borey dans le rer c : ', test)})
  .catch(function(err){console.log(err)})
  reacMng.getReaction(db,"vnr")
  .then(function(test){console.log("getReaction(partyparrot)= ", test)})
  .catch(function(err){console.log(err)})
})