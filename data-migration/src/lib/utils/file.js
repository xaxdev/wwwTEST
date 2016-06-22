import fs from 'fs';

const pause = duration => new Promise((resolve, reject) => { setTimeout(resolve, duration); });

const read = async file => {
    try {
        return await new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    } catch (err) {
        throw err
    }
}

export { pause, read };
