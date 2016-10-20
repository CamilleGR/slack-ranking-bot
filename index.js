var RankingBot = require('./lib/RankingBot.js');
var config = require('./config.js').data;




var rankingBot = new RankingBot({token:config.slackToken,name:config.botName});


rankingBot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':cat:'
    };
    console.log("test");
    // define existing username instead of 'user_name'
    bot.postMessageToUser('@camille', 'meow!', params);

});
