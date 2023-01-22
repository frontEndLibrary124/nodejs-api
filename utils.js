const fs = require('fs');

const writeDataToFile = (filename, content) => {
    console.log(`Hello`);
    fs.writeFileSync(filename, JSON.stringify(content), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`file updated!`);
        }
    });
}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        try {
            body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            req.on('end', () => {
                resolve(body);
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = {
    writeDataToFile,
    getPostData
};