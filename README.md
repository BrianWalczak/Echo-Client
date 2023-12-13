<h1 align="center">Brian's Discord Client</h1>

<p align="center">Run Discord in your console, all powered by the Discord API (and Node.js)!<br><br></p>

## Features
- Allows you to send and read messages of any custom channel ID (including DM's)!
- Automatically search for servers you're in to read and send messages.
- Download images from any URL, including the Discord CDN.
- Powered by Node.js and the officical Discord API

## Installation
To install the client on your device, enter the following commands into your terminal:

```
$ git clone https://github.com/BrianWalczak/Brians-Discord-Client.git; # Clone the repository from GitHub
$ cd Brians-Discord-Client # Enter the extracted repository folder
```

Before continuing any further, you'll first have to get your Discord account token which will be used for API requests.
If you don't know how to do this, you can read [this article](https://www.geeksforgeeks.org/how-to-get-discord-token/) for more information!

Once you find your Discord token and copy it to your clipboard, run the following commands to finish installation: 
```
$ npm install # Install libraries and dependencies
$ export discordToken=YOUR_TOKEN_HERE # Replace "YOUR_TOKEN_HERE" with your Discord account token
$ node . # Start the Node program
```
Once you run ``node .``, the Discord client will start automatically!


# Credits
- [thank you Discord for your amazing api :)](https://discord.com)

  <p align="center">Made with ♡ by <a href="https://www.brianwalczak.com">Briann</a></p>
