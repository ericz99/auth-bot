## Authentication Discord Bot

Authentication License Bot + Memberships Features + Renewal Features

## NEW(IN WORK...)

```
# I am currently implementing Auth Bot V2 w/ Custom Dashboard integrated! It will come with everything that in V1, but new features!
# List of Features:
  # Discord & Local Authentication for customers
  # Easy access to user dashboard
  # Admin portal
  # License management
  # Ability to deactiviate license + unlink email
  # Customizable settings for customer + admin
  # Auto renewal system + cancel subscriptions
  # Beautiful UI design
  # and many more...
# Pricing: TBA
# DM on twitter if you need more info!
```

## Features

- Membership Bundle Creator
- Allow Owner to customize their own membership roles.
- Allow Owner to generate Lifetime keys or any keys. And those specific keys are what it suppose to be, either Lifetime or Renewal...
- Allow Owner to remove membership option.
- Allow Owner to use either membership. (Renewal is the default choice)
- Plenty of commands that Owner can use.
- More to come...

## Instruction

- npm install
- npm run dev or npm run build or pm2 start (to run it forever in your local pc!)
- change config.example.json => config.json
- everything in the config.json must be filled in.
  - for mongoURI, you can leave as default or create an mlab account and get a cloud DB instead of using local (its free btw).
  - In addition, owner should set their roles, and fetch memberRoleID.
- If you have already install this but there's new update, just run git pull and it should pull the latest update!

## Images

![1](https://i.imgur.com/3cAHvQQ.png)

## Stuff that doesn't work yet

- You can't renew because I haven't implemented stripe into this auth bot.
- You can't delete anyone key, I'll implement that soon
- Memberships doesn' work yet, but will have that implemented into bot very soon!

## Usage

- Type +help command, and it will prompt you with list of commands
- Give the discord bot, a staff role or anything that is better than a member role
- If user key expires, bot removes the role.
- There's only one package and that is renewal package - one key is good up to 30 days.
- You "OWNER" are able to delete anyone keys and boot them off the server
- OWNER can generate there own license key if they don't have.
  - you can even put your own key if you have, just make sure it's one per line!

## Q/A

- Can I put my own licenses that I creates in the bot?
  Yes, you can just copy & paste to keys.txt file and space 1 key per line
- How do I handle if key surpassed 30 days?
  You don't have to worry because the bot does everything for you.
- What type of membership option do I have?
  Currently stripe and paypal is not implemented.
- What happen if the user key expired?
  As of now, they will simply lose role, and will have to get a new license in order to gain access again.
- Is the auth bot protected?
  Yes, it is heavily protected, and a lot of error handling + security work. There shouldn't be any problem with the auth bot.
- I still have questions?
  Simply dm on twitter.

## Errors/Bugs

```
# If you encounter any errors/bugs, google the error/bug first, before asking me. If you can't figure it out then make an issue, and ill try my best to address it.

# As of now, I do not see any Errors/bugs. Please, test this yourself before actually using it in production.
```

## Social Media

Follow me https://twitter.com/washed_kid on twitter!

## License

```
The MIT License (MIT)

Copyright (c) 2019 Eric Zhang

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
