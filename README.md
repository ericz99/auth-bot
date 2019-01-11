## Authentication Discord Bot

Authentication License Bot + Memberships Features + Renewal Features

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
- npm run dev or npm run build or pm2 start(run forever)

## Usage

- There's only one package and that is renewal package - one key is good up to 30 days.
- If user key expired after 30 days, they have to renew or they will be booted off the server after 3 days(coming soon...)
- You "OWNER" are able to delete anyone keys and boot them off the server
- If user wants to renew just dm bot => +renew emailhere
- User can choose any email, its just gonna send them a new key after making a purchase
- OWNER can generate there own license key if they don't have. 

## Q/A

- Can I put my own licenses that I creates in the bot?
  Yes, you can just copy & paste to keys.txt file and space 1 key per line
- How do I handle if key surpassed 30 days?
  You don't have to worry because the bot does everything for you.
- What type of membership option do I have?
  The only option you have so far is renewal. 
- What happen if the user key expired?
  User will have to renew, and depending how you will renew it, its totally up to you, all you need to do is post a link in 
  config.json that will redirect user to paypal purchase and "you" should send them email for their new key. Then, simply place new
  key in keys.txt
- Is the auth bot protected?
  Yes, it is heavily protected, and a lot of error handling + security work. There shouldn't be any problem with the auth bot.
- I still have questions?
  Simply dm on twitter.


## Errors/Bugs

- If you encounter any errors/bugs, google the error/bug first, before asking me. If you can't figure it out then DM on twitter.

## Social Media

Follow me https://twitter.com/washed_kid on twitter!
