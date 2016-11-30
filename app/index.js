//const bot = require('./bot.js')
const cron = require('./cron.js')

console.log(cron.jobs)
//cron.jobs.forEach(j => j.start());
cron.jobs[0].start();
cron.jobs.forEach(t => console.log(t.task))
