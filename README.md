# TimeLeap
A Discord bot that sends random messages from the previously sent messages in the same channel.

## Preparation
To run the the bot, make sure you have [Node.js](https://nodejs.org/en/) installed and a code a editor. I recommend [Visual Studio Code](https://code.visualstudio.com)

### Installing package
In your terminal type:

```shell
npm i
```

to install all dependencies

### Config
Navigate to config.json and change the value of `clientId` and `token`

### Reloading slash commands and starting the bot
Before running the bot make sure to refresh the slash command by running the `deploy-commands.js` first and then run the bot, in your terminal type:

```shell
node deploy-commands.js
node index.js
```

## Self-hosting
I'm still making the tutorial for self-hosting in order to run your bot 24/7.

## Useful links
* [Installing Node.js](https://discordjs.guide/preparations/#installing-node-js)
* [Creating your bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

If you need help, join my [Discord Server](https://discord.gg/UZrA2Z6EEn)
