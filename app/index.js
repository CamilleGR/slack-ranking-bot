const bot = require('./bot.js')
const cron = require('./cron.js')
const server = require('./server.js')


cron.jobs.forEach(j =>{
	console.log("STARTING CRON" + j)
	j.start()
});
