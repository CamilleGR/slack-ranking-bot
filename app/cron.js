const cron = require('node-cron')
const config = require('../config.js').data

let jobs = []

config.cronJobs.forEach((j) => {
  let job = cron.schedule(j.cronExpression, require('../cronJobs/'+j.scriptName).execute)
  jobs.push(job);
});

exports.jobs = jobs;
