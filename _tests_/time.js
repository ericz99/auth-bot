const moment = require('moment');

// const date = moment();
// const now = date.date();

// const newDate = moment().add(-30, 'days');

// var today = new Date()
// var priorDate = new Date().setDate(today.getDate() - 30)

var today = new Date()
var date = new Date(new Date().setDate(new Date().getDate() + 30));

const memberships = ['member', 'lifetime'];

const index = memberships.findIndex(val => val === "lifetime");

console.log(index);