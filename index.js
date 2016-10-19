var Bot = require('slackbots');


var bot = new Bot({
    token: require('./config.js').slackToken,
    name: 'cheo'
})

console.log(bot.token);
