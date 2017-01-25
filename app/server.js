var express = require('express');
const config = require('../config/config.js').data
const reactions = require('../lib/reactionService.js')
const userInfo = require('../lib/userInfo.js')
const winston = require('winston')
winston.level = process.env.LOG_LEVEL
var app = express();

console.log(__dirname)

app.use(express.static(__dirname+'/../webapp'))


app.get('/userNameList', (req,res) =>{
    userInfo
      .getUsersNameList(config.slackToken)
      .then(function(array){console.log(array);return array})
      .catch(err => winston.error(err))
})


app.get('/user/stats/:id', (req,res) =>
  reactions
    .getUserReactions(req.params.id)
      .then(s => res.send(s))
      .catch(e => winston.error(e))
);

app.get('/emoji/stats/:name', (req,res) =>
  reactions
    .getEmojiStats(req.params.name)
    .then(s => res.send(s))
    .catch(e => winston.error(e))
)

app.use('/', (req,res) =>res.send("Cheo is god, cheo is everywhere, cheo see you, fear cheo"))


app.listen(8080);
