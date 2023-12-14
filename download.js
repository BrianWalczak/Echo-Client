const { prompt } = require('enquirer');
const https = require('https');
const path = require('path');
const fs = require('fs');
console.error = function() {};

async function saveImage(url, thePath) {
    https.get(url, (res) => {
        const path = `${__dirname}/${thePath}`;
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);

        filePath.on('finish', () => {
            filePath.close();
            return;
        })
    })
}

async function ask() {
    const image = await prompt({
        type: 'input',
        name: 'url',
        message: 'Please enter an image URL'
    });

    const parsedUrl = new URL(image.url);
    const fileName = path.basename(parsedUrl.pathname);
    https.get(image.url, (res) => {
        const path = `${__dirname}/${'images/' + fileName}`;
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);

        filePath.on('finish', () => {
            filePath.close();

            console.log('The file has been successfully saved as images/' + fileName + '!');
            process.exit(1);
        })
    })
}


console.clear();
ask();
