//#lib/reactionBot.js

'use strict';

var Bot = require('slackbots')
var util = require('util');
var WebSocket = require('ws');

var RankingBot = function Constructor(){
  console.log('construction');
  this.login();
}

util.inherits(RankingBot, Bot);

RankingBot.prototype.connect = function() {
    this.ws = new WebSocket(this.wsUrl);
    console.log('redefinition');
    this.ws.on('open', function(data) {
        this.emit('open', data);
    }.bind(this));

    this.ws.on('close', function(data) {
        this.emit('close', data);
    }.bind(this));

    this.ws.on('message', function(data) {
        try {
            this.emit('message', JSON.parse(data));
        } catch (e) {
            console.log(e);
        }
    }.bind(this));
};


module.exports = RankingBot;
