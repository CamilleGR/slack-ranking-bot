const commands = require('./commands.js')
const config = require('../config.js').data
const MongoClient = require('mongodb').MongoClient
const slack = require('slack')
const reacMng = require('../lib/reactionManager.js')
const winston = require('winston')
const userInfo = require('./userInfo.js')

let handler = function handler(data){
  let matches;
  switch(true){
    case commands.regex_stat.test(data.text) :
      matches = commands.regex_stat.exec(data.text)
      winston.debug(matches)
      if(matches[2]==='emoji') {emojiStats(matches[3], data.channel)}
      else if(matches[2]==='utilisateur'){ userStats(matches[3],data.channel)}
    break;
    case commands.regex_ping.test(data.text): sendMessage('Oui, je suis là !',data.channel)
    break;
    default:
      sendMessage('Désolé, je n\'ai pas compris votre demande :confused:', data.channel)
  }
}

function userStats(userName, channel){
  userInfo.getUsersIdList(config.slackToken).then((idList)=>{
    if(idList==null) {
      sendMessage('Hmmmm, on dirait que je n\'arrive pas à créer la liste des utilisateurs :confused:',channel)
      return;
    }
    else if(idList[userName]==null) {
      sendMessage('Hmmmm, on dirait que l\'utilisateur n\'existe pas :confused:',channel)
      return;
    }
    MongoClient.connect(config.dbUrl, function(err, db) {
      if(db != null){
        reacMng.getUserReactions(db,idList[userName]).then((data)=>{
          if(data==null) {
            sendMessage('Hmmmm, je ne trouve rien dans ma base de données :confused:',channel)
            return
          }
          message = 'Stats de '+userName+' \n'
          if(data.length ===0)
            message ='Désolé ! '+userName+' n\'a pas reçu de réactions !'
          else
          data.forEach((emoji) =>{
            if(emoji.scores.pts > 0)
              message += '- :'+emoji.name+': : '+emoji.scores.pts+'\n'
          })
          sendMessage(message,channel)
        }).catch((err)=>{
          winston.error(err)
          sendMessage('Ma DB est cassée :sob:',channel)
        })
      }
    })
  })
  .catch((err)=>{
    winston.error(err)
    sendMessage('Désolé, je n\'ai pas réussi à calculer les stats :sob:',channel)
  })
}




function emojiStats(emojiName, channel){
  winston.debug('ASK FOR EMOJI STATS')
  MongoClient.connect(config.dbUrl, (err, db)=> {
    reacMng.getReaction(db,emojiName).then((reaction)=>{

    userInfo.getUsersNameList(config.slackToken)
      .then((nameList)=>{
        let rank = 'Classement pour l\'emoji '+emojiName+'\n'
        winston.debug(reaction)
        if(reaction === null || reaction.length===0){
          sendEmojiNotFound(channel)
          return
        }
        reaction[0].scores.forEach((user)=>{
          winston.debug(user)
          rank +='- ' +nameList[user.name] + ': '+ user.pts+' pts\n'
        })
        sendMessage(rank,channel)
      })
    .catch((err)=>{winston.error('Unable to create the userName list : ',err)})
    })
  })
}

function sendEmojiNotFound(channel){
  sendMessage('Désolé, je n\'ai pas trouvé cet emoji :confused:',channel)
}

function sendMessage(message,channel){
  slack.chat.postMessage(
      {token:config.slackToken, channel:channel, text:message, as_user:true}
      , (err,data)=>{
          winston.error(err)
          winston.debug(data)
      })
}


module.exports = {
                    handler: handler
                  }
