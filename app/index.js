const bot = require('./bot.js')
const cron = require('./cron.js')

cron.jobs.forEach(j =>{ 
	console.log("STARTING CRON" + j)
	j.start()
});
