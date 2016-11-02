var slack = require('slack')
var winston = require('winston')

var getUserName = function(slackToken,userId){
    return new Promise(function(resolve, reject){
      slack.users.info({token:slackToken, user:'U1M415W4U'},function(err,data){
          if(err === null && data !== null)resolve(data.user.name)
          else reject(err)
      })
    })
}


var getUsersNameList = function(slackToken){
    return new Promise(function(resolve, reject){
      slack.users.list({token:slackToken},function(err,data){
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
