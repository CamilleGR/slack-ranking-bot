const winston = require('winston')
winston.level = process.env.LOG_LEVEL
const reactions = require('./reactionManager.js');
const MongoClient = require('mongodb').MongoClient
const config = require('../config/config.js').data
const userInfo = require('./userInfo.js')

let userNameList;

userInfo.getUsersNameList(config.slackToken)
  .then(list => userNameList=list)
  .catch(err => winston.error(err))


let getUserReactions = function(userID){
  return new Promise((res,rej) => {
    MongoClient
      .connect(config.dbUrl, (err,db) => {
        if(err)rej(err);
        reactions
          .getUserReactions(db, userID)
            .then(d =>{
                    d.forEach(u => u.scores.name=userNameList[userID])
                    res(d)
                  })
            .catch(err => rej(err))
      })
  });
}

function getEmojiStats(emojiName){
  return new Promise((res,rej) =>{
    MongoClient.connect(config.dbUrl, (err, db)=> {
      if(err)rej(err);
      reactions.getReaction(db,emojiName)
        .then(reaction=>{
          reaction.forEach(e => e.scores.name = userNameList[e.scores.name])
          res(reaction)
        })
        .catch(err => winston.error(err))
    })
  })
}


module.exports =
                {
                  getUserReactions : getUserReactions,
                  getEmojiStats : getEmojiStats
                };
