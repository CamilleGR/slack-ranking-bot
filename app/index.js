const bot = require('./bot.js')
const cron = require('./cron.js')

cron.jobs.forEach(j => j.start());
