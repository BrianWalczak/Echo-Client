const { prompt } = require('enquirer');
const readline = require('readline');
const fs = require('fs');
var config = null;
const startReadline = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

async function run() {
	await updateConfig();

	const command = await prompt({
    type: 'select',
    name: 'type',
    message: 'Please select an option:',
    choices: ['View Channel', 'Configuration', 'Download Image'],
  });

	startReadline.close();
	console.clear();
	if(command.type == "View Channel") {
		import('./app.js');
	}

	if(command.type == "Configuration") {
		import('./config.js');
	}

	if(command.type == "Download Image") {
		import('./download.js');
	}
}

console.clear();
console.log("---------- Brian's Discord Client ----------\n\n");
run();