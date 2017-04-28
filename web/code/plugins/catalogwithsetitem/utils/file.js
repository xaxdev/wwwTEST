import fs from 'fs';

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

const write = async (file, data) => {
    try {
        return await new Promise((resolve, reject) => {
            fs.writeFile(file, data, err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    } catch (err) {
        throw err
    }
}

export { read, write };
