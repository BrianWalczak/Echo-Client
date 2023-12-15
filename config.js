const cc = require("node-console-colors");
const { prompt } = require('enquirer');

const fs = require('fs');
const https = require('https');
var config = null;
var discordToken = null;
console.error = function() {};

async function getGuilds() {
    const req = await fetch(`https://discord.com/api/users/@me/guilds`, {
        method: "GET",
        headers: {
            "Authorization": discordToken,
        }
    })

    const response = await req.json();

    return response;
}

async function getChannels(guild) {
    const validChannels = [];

    const req = await fetch(`https://discord.com/api/v9/guilds/${guild}/channels`, {
        method: "GET",
        headers: {
            "Authorization": discordToken,
        }
    })

    const response = await req.json();

    await response.forEach(channel => {
        if (channel.type == 0) {
            validChannels.push(channel);
        }
    });


    return validChannels;
}

async function saveSettings(guildName, channelID, channelName) {
    fs.writeFile('config.json', `{"guildName": "${guildName}", "channelID": "${channelID}", "channelName": "${channelName}"}`, 'utf8', (err) => {
        if (err) {
            console.log('Error saving your settings:', err);
        } else {
            return;
        }
    });
}

function updateConfig() {
    return new Promise((resolve, reject) => {
        fs.readFile('config.json', 'utf8', function(err, data) {
            if (err) {
                reject(err);
            } else {
                config = JSON.parse(data);
                resolve();
            }
        });
    });
}

async function configureSettings() {
    await updateConfig();
	
	if (!config.guildName || !config.channelName || !config.channelID) {
		console.log("Welcome to Echo Client, the feature-rich text based Discord client!\nTo get started, select a server that you'd like to view.\n\n");
	} else {
		console.log(`---------- Configuration ----------\n${config.guildName != "null" ? "Server | " + config.guildName : "The current channel has been manually set"}\n${config.channelName != "null" ? "Channel | " + config.channelName : "Channel ID | " + config.channelID}\n\n`);
	}

    const type = await prompt({
        type: 'select',
        name: 'option',
        message: 'Please select a method:',
        choices: ['Select server', 'Manual'],
    });
	
	console.clear();
	if (!config.guildName || !config.channelName || !config.channelID) {
		console.log("Welcome to Echo Client, the feature-rich text based Discord client!\nTo get started, select a server that you'd like to view.\n\n");
	} else {
		console.log(`---------- Configuration ----------\n${config.guildName != "null" ? "Server | " + config.guildName : "The current channel has been manually set"}\n${config.channelName != "null" ? "Channel | " + config.channelName : "Channel ID | " + config.channelID}\n\n`);
	}
	
	if (type.option == 'Select server') {
        const guilds = await getGuilds();

        const q1 = await prompt({
            type: 'select',
            name: 'guild',
            message: 'Please select a server:',
            choices: guilds.map(guild => ({
                name: guild.name,
                value: guild.id
            })),

            result(answer) {
                return this.map(answer);
            }
        });
		
		console.clear();
		if (!config.guildName || !config.channelName || !config.channelID) {
			console.log("Welcome to Echo Client, the feature-rich text based Discord client!");
			console.log("Now, select a channel that you'd like to message in.\n\n");
		} else {
			console.log(`---------- Configuration ----------\n${config.guildName != "null" ? "Server | " + config.guildName : "The current channel has been manually set"}\n${config.channelName != "null" ? "Channel | " + config.channelName : "Channel ID | " + config.channelID}\n\n`);
		}

        const channels = await getChannels(Object.values(q1.guild)[0]);
        const q2 = await prompt({
            type: 'select',
            name: 'channel',
            message: 'Please select a channel:',
            choices: channels.map(channel => ({
                name: "#" + channel.name,
                value: channel.id
            })),

            result(answer) {
                return this.map(answer);
            }
        });

        await saveSettings(Object.keys(q1.guild)[0], Object.values(q2.channel)[0], Object.keys(q2.channel)[0]);
        console.clear();
        import('./app.js');
    } else if (type.option == "Manual") {
        const response = await prompt({
            type: 'input',
            name: 'channel',
            message: 'Please enter a Channel ID'
        });

        await saveSettings(null, response.channel, null);
        console.clear();
        import('./app.js');
    }
}

fs.readFile("token.txt", 'utf8', (error, data) => {
    if (error) return console.error(error);
    discordToken = data;

    console.clear();
    configureSettings();
});
