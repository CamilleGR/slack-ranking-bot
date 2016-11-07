let slack = require('slack')
let winston = require('winston')
require('es6-promise').polyfill();


let getUserName = function(slackToken,userId){
    return new Promise((resolve, reject)=>{
      slack.users.info({token:slackToken, user:userId},(err, data)=>{
          if(err === null && data !== null)resolve(data.user.name)
          else reject(err)
      })
    })
}


let getUsersNameList = function(slackToken){
    return new Promise((resolve, reject)=>{
      slack.users.list({token:slackToken},(err, data)=>{
        if(data === null || err !== null) reject(err)
        let array = []
        data.members.map((user)=>{
          array[user.id]=user.name
        })
        resolve(array)
      })
    })
}

let getUsersIdList = function(slackToken){
    return new Promise((resolve, reject)=>{
      slack.users.list({token:slackToken},(err, data)=>{
        let array = []
        data.members.map((user)=>{
          array[user.name]=user.id
        })
        resolve(array)
      })
    })
}



module.exports = {
                    getUserName: getUserName,
                    getUsersNameList: getUsersNameList,
                    getUsersIdList: getUsersIdList
                  }
