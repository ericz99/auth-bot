const moment = require('moment');
const schedule = require('node-schedule');
const fs = require('fs');
const User = require('../db');
const mongoose = require('mongoose');

// const date = moment();
// const now = date.date();

// const newDate = moment().add(-30, 'days');

// var today = new Date()
// var priorDate = new Date().setDate(today.getDate() - 30)

var today = new Date()
var date = new Date(new Date().setDate(new Date().getDate() + 30));

const memberships = ['member', 'lifetime'];

const index = memberships.findIndex(val => val === "lifetime");

// console.log(index);


// checkDaily();
// fs.readFile('../keys.txt', 'utf-8', (err, data) => {
//   if (!err) {
//     const keys = data.split('\r\n');
//     for (let i = 0; i < keys.length; i++) {
//       User.find({})
//         .then(users => {
//           users.map(user => {
//             console.log(user)
//           })
//         }).catch(err => console.log(err))
//     }
//   }
// });

const queryAllUsers = () => {
  mongoose.connect('mongodb://localhost/auth-bot', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (!err) {
      fs.readFile('../keys.txt', 'utf-8', (err, data) => {
        if (!err) {
          const keys = data.split('\r\n');
          for (let i = 0; i < keys.length; i++) {
            User.find({ userKey: keys[i] })
              .then(users => {
                if (users) {
                  users.map(user => {
                    const currentDate = new Date();
                    const expiredDate = user['expiredDate'];

                    console.log(user);

                    if (currentDate == expiredDate) {
                      console.log(true);
                    } else {
                      console.log(false);
                    }
                  })
                }
              }).catch(err => console.log(err))
          }
        }
      });
    }
  });
}

function checkDaily() {
  schedule.scheduleJob({ second: 20 }, () => {
    queryAllUsers();
  });
}

checkDaily();
