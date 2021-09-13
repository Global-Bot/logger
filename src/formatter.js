const { Formatter, LogLevel } = require('@ayana/logger');
const chalk = require('chalk');
const { white, cyan, blue, gray } = chalk;
const moment = require('moment');

const getColor = (level) => {
	switch (level) {
		case LogLevel.TRACE:
		case LogLevel.DEBUG:
			return chalk.blue;
		case LogLevel.INFO:
			return chalk.green;
		case LogLevel.ERROR:
			return chalk.red;
		case LogLevel.WARN:
			return chalk.yellow;
	}
}

const getSymbol = (level) => {
	switch (level) {
		case LogLevel.TRACE:
		case LogLevel.DEBUG:
			return '⚙';
		case LogLevel.INFO:
			return '🆗';
		case LogLevel.ERROR:
			return '🔥';
		case LogLevel.WARN:
			return '☣';
	}
}

const s = arr => arr.join(' ');

class GlobalFormatter extends Formatter {
    constructor() {
        super();

        this.formatError = this.formatMessage;
    }
    
    formatMessage(meta, message) {
        const { level } = meta;
        const logColor = getColor(level);
        const timestamp = moment().format('YYYY-MM-DD HH:mm:ss:SSS');

        return s([
            logColor(s([
                `[${timestamp}]`,
                getSymbol(level),
                level
            ])),
            white(this.buildMessage(meta, message))
        ]);
    }

    buildMessage(meta, message) {
        const { origin: { packageName, packagePath, name }, uniqueMarker } = meta;

        return [
            '[',
            cyan(`${packageName}:`),
            blue(`${packagePath}${name}`),
            uniqueMarker ? `/${gray(`${uniqueMarker}`)}` : '',
            ']',
            ' ',
            message
        ].join('');
    }
}

module.exports = GlobalFormatter;