import winston from 'winston';
import transport from 'winston-daily-rotate-file';

export default new winston.Logger({
    transports: [
        new transport({
            filename: './debug.log',
            level: 'debug',
            colorize: true,
            showLevel: false,
            timestamp: false,
            json: false
        })
    ],
    exitOnError: false
});
