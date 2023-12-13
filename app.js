const cc = require("node-console-colors");
const readline = require('readline');
const fs = require('fs');
const https = require('https');
var config = null;
console.error = function() {};

const appReadline = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function emojiFilter(inputString) {
    const regex = /<a?:([\w]+):(\d+)>/g;

    const replacedString = inputString.replace(regex, (match, emojiName, emojiId) => {
        return `(${emojiName} emoji)`;
    });

    return replacedString;
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

async function sendMessage(message) {
    const req = await fetch(`https://discord.com/api/v9/channels/${config.channelID}/messages`, {
        method: "POST",
        body: JSON.stringify({
            content: message,
        }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.discordToken,
        }
    })

    const response = await req.json();

    return response;
}

function messageDate(message) {
    const currentDate = new Date();
    const messageDate = new Date(message.timestamp);
    let formattedDate = '';

    if (currentDate.getFullYear() === messageDate.getFullYear() && currentDate.getMonth() === messageDate.getMonth() && currentDate.getDate() === messageDate.getDate()) {
        formattedDate = 'Today at ' + messageDate.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    } else {
        formattedDate = messageDate.toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        formattedDate = formattedDate.replace(', ', ' at ');
    }

    return formattedDate;
}

async function getMessages() {
    const req = await fetch(`https://discord.com/api/v9/channels/${config.channelID}/messages?limit=100`, {
        method: "GET",
        headers: {
            "Authorization": process.env.discordToken,
        }
    })

    const response = await req.json();
    console.log(`-------- ${config.guildName != "null" ? config.guildName : "Channel Messages"} --------\n`)

    for (let i = response.length - 1; i >= 0; i--) {
        const message = response[i];
        const msgDate = messageDate(message);

        if (message.content != null) {
            if (message.author.discriminator != "0") {
                console.log(`\n${cc.set("bg_white", `${message.author.username} [${message.author.username}#${message.author.discriminator}]`)} - ${(message.content)}${message.attachments[0] != null ? '\n' + message.attachments[0].url : ''}`);
            } else {
                console.log(`\n${cc.set("bg_white", `${message.author.global_name} [@${message.author.username}]`)} - ${(message.content)}${message.attachments[0] != null ? '\n' + message.attachments[0].url : ''}`);
            }

            console.log(msgDate);
        }
    }
}

async function refresh() {
    console.clear();
    await updateConfig();
    await getMessages();

    appReadline.question(`\nMessage ${config.channelName != "null" ? config.channelName : "in channel"} (enter to refresh): `, async (msg) => {
        if (msg != "") {
            await sendMessage(msg);
            refresh();
        } else {
            refresh();
        }
    });
}

refresh();
