const { Client, Intents } = require("discord.js");
const Pinger = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
Pinger.config = require("./config.js");
const config = Pinger.config;
let stopped = false;
let timestamps = [
	{
		localTimestamp: 123123,
		discordTimestamp: 121234,
		id: 32532,
	},
];

let lastMessage;

let stoppedLocalTimestamp;

Pinger.on("ready", async () => {
	Pinger.user.setActivity("Iam normal bot :kappa:");
	console.log(`${Pinger.user.username} is online!`);
});

Pinger.on("messageCreate", async (message) => {
	let prefix = config.prefix;
	if (!message.content.startsWith(prefix)) return;

	async function init() {
		console.log(1);
		await sleep(1000);
		console.log(2);
	}

	function sleep(ms) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}

	if (config.ownerOnly == true && message.author.id !== config.ownerID) {
		return;
	} else {
		if (message.content.startsWith(prefix + "ping")) {
			stopped = false;
			let user = message.mentions.users.first();
			if (!user)
				return message.channel.send(
					`**${message.author.username}**, you must mention someone!`
				);

			message.channel.send(
				`**${message.author.username}**, ping on **${user.tag}** started!`
			);
			Pinger.user.setActivity(`Pinging: ${user.tag}`);
			console.log(`Started pinging on: ${user.tag}!`);

			startPinging(user);
		}

		if (message.content.startsWith(prefix + "stop")) {
			stopped = true;
			stoppedLocalTimestamp = Date.now();
			await message.channel.send(
				`**${message.author.username}**, stopped pinging successfully!`
			);
			await Pinger.user.setActivity("Iam normal bot :kappa:");
			console.log(`Stopped pinging by: ${message.author.tag}`);

			pruneOverflow(message.channel);
		}
	}
});

async function startPinging(user) {
	const pingChannel = await Pinger.channels.fetch(config.channelName);

	if (!pingChannel) {
		await message.guild.createChannel(`${config.channelName}`).then((c) => {
			console.log(
				`Channel not found. Created new one.\nName: ${c.name}\nID: ${c.id}`
			);
			c.send(`<@${user.id}>`).then(() => ping(user, pingChannel));
		});
	} else {
		ping(user, pingChannel);
	}

	async function ping(user) {
		if (stopped) {
			return;
		}

		const pingChannel = await Pinger.channels.fetch(config.channelName);
		if (stopped) {
			finialize();
			return;
		}

		let timestampObject = { localTimestamp: Date.now() };
		console.log("Sending ping...");
		pingChannel
			.send(`<@${user.id}>`)
			.then((message) => {
				lastMessage = message;
				if (stopped) {
					finialize();
					return;
				}
				let messageVar = message;
				console.log(
					`Message posted. Created at ${messageVar.createdTimestamp}`
				);
				timestampObject["discordTimestamp"] = messageVar.createdTimestamp;
				timestampObject["id"] = messageVar.id;

				timestamps.push(timestampObject);

				ping(user);
			})
			.catch((error) => {
				console.error(`An error has occured: ${error}`);
				finialize();
				return;
			});
	}
}

function finialize() {
	lastMessage.delete();
}

function pruneOverflow() {
	timestamps.forEach((timestampObj) => {
		if (timestampObj.stoppedLocalTimestamp < timestampObj.discordTimestamp) {
			timestampObject["obj"].delete().then((msg) => {
				console.log(`Deleted overflow`);
			});
		}
	});
}

Pinger.login(config.token);
