require('console-stamp')(console, {
  colors: {
    stamp: 'yellow',
    label: 'cyan',
    label: true,
    metadata: 'green'
  }
});

const Discord = require("discord.js");
const { prefix, token, colors } = require("./config.example.json");
const client = new Discord.Client();
const uuid = require('uuid/v4');
const fs = require('fs');
const schedule = require('node-schedule');
const moment = require('moment');
const mongoose = require('mongoose');
const User = require('./db');

var guild = null;
var availableRoles = [];
var licenses = [];

// moment configuration

function generateLicense(quantity) {
  for (let i = 0; i < quantity; i++) {
    licenses.push(uuid())
  }
}

mongoose.connect('mongodb://localhost/auth-bot', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
  if (!err) {
    client.on("ready", () => {
      client.user.setPresence({
        'game': {
          'name': 'Playing with Authentication Bot',
          'type': 'Playing'
        }
      })

      console.log(`Logged in as ${client.user.tag}! Successfully connected bot!`);

      if (client.guilds.array().length > 1) {
        console.log("Your Key bot can only belong to one server.");
        process.exit(1);
      } else if (client.guilds.array().length === 0) {
        console.log("Your Key bot must be assigned to a server in order to be used.");
        process.exit(1);
      } else {

        guild = client.guilds.array()[0];

        guild.roles.forEach((r) => {
          availableRoles.push({
            title: r.title,
            id: r.id,
            color: r.color
          });
        });

        console.log('Server:', guild.name);
        console.log('Member Count:', guild.members.array().length);
        console.log('Available Roles:', availableRoles.length);
      }
    });

    client.on("disconnect", () => {
      console.error("An error has occured while trying to establish a connection with your Discord Bot. Please check you special keys in your config.json file and try again.");
      process.exit(1);
    });

    client.on("message", msg => {
      if (msg.channel.type == "dm" && msg.content.startsWith(prefix + 'help')) {
        let helpEmbed = new Discord.RichEmbed()
          .setAuthor("Authentication Instruction ( DM ONLY )")
          .setColor("#9b42f4")
          .setDescription('Please use the following commands to authenicate yourself...')
          .addField('Activiation Command: ', "+activate <license>")
          .addField('Renewal Command: ', "+renew <youremail@gmail.com>")
          .addField("Membership Creator ( ONLY ADMIN USAGE ): ", "+add <membership role>")
          .addField("Membership Removal ( ONLY ADMIN USAGE ): ", "+remove <membership role>")
          .addField("List of memberships: ", "+show")
          .addField('Admin Generate Licenses ( ONLY ADMIN USAGE ): ', '+gen <quantity>')

        return msg.author.send(helpEmbed);
      }

      /* Activiate License */
      if (msg.channel.type == 'dm' && msg.content.startsWith(prefix + "activate")) {
        const license = msg.content.split(" ")[1];
        const discordUserID = msg.author.id;

        fs.readFile('keys.txt', 'utf-8', (err, data) => {
          if (!err) {
            client.guilds.array()[0].members.forEach(member => {
              let isMember = member.roles.find(role => role.name === 'Member'); // check if user has role
              if (member.user.id === msg.author.id && isMember) {
                const failureEmbed = new Discord.RichEmbed()
                  .setAuthor("Activation ( FAILURE )")
                  .setColor("#cc0000")
                  .addField("Failed to authenticate: ", license)
                  .addField("Reason: ", "It looks like you're already a member of the group :smile:")

                return msg.author.send(failureEmbed);
              }

              if (member.user.id === msg.author.id && !isMember) {
                if (msg.content.split(" ").length !== 2) {
                  return msg.author.send(`Hey, please authenicated yourself, by typing +activate <license>.`)
                }

                // license pool
                const licensePool = data.split("\r\n");

                // check if user key exist && check if any user has that key or already authenicated 
                if (licensePool.indexOf(license) > -1) {
                  User.findOne({ userKey: license })
                    .then(user => {
                      if (!user) {
                        /* generate a new user with that license and other credentials */
                        const newUser = new User({
                          userKey: license,
                          authenicated: true,
                          discordUserID: discordUserID,
                          currentDate: new Date(),
                          expiredDate: new Date(new Date().setDate(new Date().getDate() + 30))
                        });

                        // save user 
                        newUser.save()
                          .then(() => {
                            const member = guild.member(msg.author);
                            if (member) {
                              // after successfully authenicated, give user role => access for only 30 days
                              member.addRoles(["488838625346191361", "506674080699777066"]);

                              const successEmbed = new Discord.RichEmbed()
                                .setAuthor("Authentication Bot ( SUCCESS )")
                                .setColor("#9b42f4")
                                .addField("Activated: ", `${license} :white_check_mark:`)

                              return msg.author.send(successEmbed);
                            }
                          }).catch(err => {
                            if (err) return err;
                          });
                      } else {
                        // check if user key already is activiated if it is, then display error...
                        const failureEmbed = new Discord.RichEmbed()
                          .setAuthor("Authentication Bot ( FAILURE )")
                          .setColor("#cc0000")
                          .addField("Failed to authenticate: ", license)
                          .addField("Reason: ", "License has already been verified :anguished:")
                          .addField("Error?", "Please contact admin if you think that was an error")

                        return msg.author.send(failureEmbed);
                      }
                    }).catch(err => {
                      if (err) return err;
                    });
                } else {
                  return msg.author.send(`Invalid License! Please contact admin now! :x:`);
                }

                // check if user membership is over

                // once user membership is over, he or she is allowed to renew - they will be unauthenicated

              }
            });
          }
        });
      }

      /* Renewal Membership */
      if (msg.channel.type == 'dm' && msg.content.startsWith(prefix + 'renew')) {
        const userEmail = msg.content.split(" ")[1];

        // check if user is not authenticated if user is not authenticated then give them your paypal redirect link

        // then simply replace the old key with new key

        // then add role back

        return msg.author.send('Here\'s the paypal link to renew your license!');
      }

      /* Memberships Creator */
      if (msg.channel.type == 'dm' && msg.content.startsWith(prefix + "add")) {
        const option = msg.content.split(" ")[1];
        client.guilds.array()[0].members.forEach(member => {
          let isStaff = member.roles.find(role => role.name === 'Staff');

          if (member.user.id === msg.author.id && isStaff) {
            fs.readFile('config.example.json', 'utf-8', (err, data) => {
              if (!err) {
                const parsedJSON = JSON.parse(data);
                parsedJSON['memberships'].push(option);

                fs.writeFile('config.example.json', JSON.stringify(parsedJSON), (err) => {
                  if (!err) {
                    const successEmbed = new Discord.RichEmbed()
                      .setAuthor("Bundle Creator ( SUCCESS )")
                      .setColor("#9b42f4")
                      .addField("Membership Created: ", option)

                    return msg.author.send(successEmbed);
                  }
                })
              }
            });
          }

          // check if user isn't staff role
          if (member.user.id === msg.author.id && !isStaff) {
            const failureEmbed = new Discord.RichEmbed()
              .setAuthor("Bundle Creator ( FAILURE )")
              .setColor("#cc0000")
              .addField("Failed to add: ", option)
              .addField("Reason: ", "Staff Permission Required!")

            return msg.author.send(failureEmbed);
          }
        });
      }

      /* Remove memberships */
      if (msg.channel.type == 'dm' && msg.content.startsWith(prefix + "remove")) {
        const option = msg.content.split(" ")[1];
        client.guilds.array()[0].members.forEach(member => {
          let isStaff = member.roles.find(role => role.name === 'Staff');

          if (member.user.id === msg.author.id && isStaff) {
            fs.readFile('config.example.json', 'utf-8', (err, data) => {
              if (!err) {
                const parsedJSON = JSON.parse(data);
                const index = parsedJSON['memberships'].findIndex(val => val === option);

                if (index !== -1) {
                  parsedJSON['memberships'].splice(index, 1);
                  fs.writeFile('config.example.json', JSON.stringify(parsedJSON), (err) => {
                    if (!err) {
                      const successEmbed = new Discord.RichEmbed()
                        .setAuthor("Bundle Creator ( SUCCESS )")
                        .setColor("#9b42f4")
                        .addField("Membership Removed: ", option)

                      return msg.author.send(successEmbed);
                    }
                  })
                } else {
                  const failureEmbed = new Discord.RichEmbed()
                    .setAuthor("Bundle Creator ( FAILURE )")
                    .setColor("#cc0000")
                    .addField("Failed to remove: ", option)
                    .addField("Reason: ", `${option} does not exist`)

                  return msg.author.send(failureEmbed);
                }
              }
            });
          }

          // check if user isn't staff role
          if (member.user.id === msg.author.id && !isStaff) {
            const failureEmbed = new Discord.RichEmbed()
              .setAuthor("Bundle Creator ( FAILURE )")
              .setColor("#cc0000")
              .addField("Failed to remove: ", option)
              .addField("Reason: ", "Staff Permission Required!")

            return msg.author.send(failureEmbed);
          }
        });
      }

      /* Show all current memberships */
      if (msg.channel.type == 'dm' && msg.content.startsWith(prefix + "show")) {
        fs.readFile('config.example.json', 'utf-8', (err, data) => {
          if (!err) {
            const parsedJSON = JSON.parse(data);
            const memberships = parsedJSON['memberships'];
            const listEmbed = new Discord.RichEmbed()
              .setAuthor("Bundle Creator ( SUCCESS )")
              .setColor("#9b42f4")
              .addField("List of memberships: ", memberships.length === 0 ? undefined : memberships)

            return msg.author.send(listEmbed);
          }
        });
      }

      /* Generate licenses */
      if (msg.channel.type == 'dm' && msg.content.startsWith(prefix + "gen")) {
        client.guilds.array()[0].members.forEach(member => {
          // member.user.id === msg.author.id
          // msg.members.roles.has("488838473298477068")
          // console.log(member.roles.find(role => role.name === 'Dev'))
          let isDev = member.roles.find(role => role.name === 'Dev'); // check if user has role

          if (member.user.id === msg.author.id && isDev) {
            const quantity = parseInt(msg.content.split(" ")[1]);

            if (quantity > 0) {
              generateLicense(quantity);
              fs.writeFile('keys.txt', licenses.join('\r\n'), (err) => {
                if (!err) {
                  licenses = []; // clearing remain licenses...
                  return msg.author.send(`Successfully generated ${quantity} licenses...`)
                }
              });
            }
          }

          if (member.user.id === msg.author.id && !isDev) {
            return msg.author.send("Sorry, only admin are allow to use this command. Please try again! :x: ");
          }
        });
      }

    });
  } else {
    console.log("Failed to connect to mongodb server...");
    return process.exit();
  }
});

// check everyday to see if any user membership is over... every 20 hours
function checkDaily() { }

client.login(token);
