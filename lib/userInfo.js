var slack = require('slack')
var winston = require('winston')

var getUserName = function(slackToken,userId){
    return new Promise(function(resolve, reject){
      slack.users.info({token:slackToken, user:userId},function(err,data){
          if(err === null && data !== null)resolve(data.user.name)
          else reject(err)
      })
    })
}


var getUsersNameList = function(slackToken){
    return new Promise(function(resolve, reject){
      slack.users.list({token:slackToken},function(err,data){
        if(data === null || err !== null) reject(err)
        var array = []
        data.members.map(function(user){
          array[user.id]=user.name
        })
        resolve(array)
      })
    })
}




module.exports = {
                    getUserName: getUserName,
                    getUsersNameList: getUsersNameList
                  }
