<h1 align="center">Echo Client - The text based Discord client</h1>

<p align="center">Run Discord in your console, all powered by the Discord API (and Node.js)!<br><br></p>

## Features
- Allows you to send and read messages of any custom channel ID (including DM's)!
- Automatically search for servers you're in to read and send messages.
- Download images from any URL, including the Discord CDN.
- Powered by Node.js and the officical Discord API

## Installation
To install the client on your device, enter the following commands into your terminal:

```bash
$ git clone https://github.com/BrianWalczak/Echo-Client.git; # Clone the repository from GitHub
$ cd Echo-Client # Enter the extracted repository folder
$ npm install # Install libraries and dependencies
```

Before continuing any further, you'll first have to get your Discord account token which will be used for API requests.
To get your token, you can execute this code on a discord.com Chrome tab:
```js
document.write("Your Discord token is: " + (webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken());
```
<b>Warning: Your Discord token is case-sensitive and grants access to your Discord account. Do NOT share this token to anyone.</b>

<br></br>
Once you find your Discord token and copy it to your clipboard, open up token.txt with `sudo nano token.txt` and paste your key. Then, run this command to start the client: 
```bash
$ node . # Start the Node program
```
Once you run ``node .``, the Discord client will start automatically!


# Credits
- [thank you Discord for your amazing api :)](https://discord.com)

  <p align="center">Made with ♡ by <a href="https://www.brianwalczak.com">Briann</a></p>
