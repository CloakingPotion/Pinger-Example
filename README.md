# DiscordPinger

Bot for ping spamming someone.

## Installation

All you need to do, is install discord.js using `npm i discord.js@11.4.2` or simply using setup.bat/setup.sh files.

## Setup

If you want to use DiscordPinger, you will need to rename `config.js.example` to `config.js`.

Then, open `config.js` and fill it with needed informations.

###### config.js:

```js
const config = {
	prefix: "!", //Add your prefix here

	ownerOnly: true, //If set to true, only bot owner can control Pinger. If set to false, everyone can use Pinger.

	ownerID: "146793113573130240", //Id of bot owner for "ownerOnly" function.

	channelName: "general", //Name of channel, where will be all pings sent.

	pingInterval: "1000", //Time in ms (miliseconds). 1000 recommended - If 1000ms (1s), bot will send ping every 1000ms (1s).

	token: "OTE4MTYyNDEwNzAxOTkyMDA2.YbDPYQ.wUuv--z-1Fl4oa9IgcMDk1iuy8M", //Bot token from discord app.
};

module.exports = config;
```

## Running DiscordPinger

You can start bot using `node pinger.js`, or simply use `start.bat` on windows, or `start.sh` on linux.

## Commands

| Usage           | Description                             |
| --------------- | --------------------------------------- |
| ping <@mention> | This will start pinging mentioned user. |
| stop            | This command will stop pinging.         |

## To-do

- [x] Add stop to stop pinging.
- [x] If channel does not exist, or was deleted, create new one.
- [ ] Prevent stopping, when bot does not pinging.
- [ ] Create DBM (Discord Bot Maker) version of DiscordPinger: [here](https://github.com/justwolfii/DiscordPinger/tree/dbm).

> _If you will find bug, create an issue and describe it._

> _Feel free to make Pull request with new features, or fixes._
