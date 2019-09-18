const fs = require('fs');
const readFilePromise = filename => {
    new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            console.log(filename,data);
            resolve(data);
        });
    });
}

async function main() {
    const txt = await readFilePromise('mock.txt');
    console.log(txt.toString());
}

main();