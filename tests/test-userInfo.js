var config = require('../config.js').data
var userInfo = require('../lib/userInfo.js')

userInfo.getUsersNameList(config.slackToken)
  .then(function(result){console.log(result)})

  userInfo.getUsersNameList(config.slackToken)
    .then(function(result){
      console.log("name =",result['U1M800A4E'])
    }).catch(function(err){console.log(err)})

    userInfo.getUsersIdList(config.slackToken)
      .then(function(result){
        console.log("name =",result['drhouse'])
        console.log("name =",result['camille'])
        console.log("name =",result['oscar'])
      }).catch(function(err){console.log(err)})
