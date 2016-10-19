#lib/reactionBot.js

'use strict';

var Bot = require('slackbots');

/*
var bot = new Bot({
    token: require('./config.js').slackToken,
    name: 'cheo'
})
*/

var RankingBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'norrisbot';
    this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'norrisbot.db');

    this.user = null;
    this.db = null;
};
