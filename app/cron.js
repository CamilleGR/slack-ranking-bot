const cron = require('node-cron')
const config = require('../config/config.js').data

let jobs = []

config.cronJobs.forEach((j) => {
  let job = cron.schedule(j.cronExpression, require('../config/cronJobs/'+j.scriptName).execute)
  jobs.push(job);
});

exports.jobs = jobs;
