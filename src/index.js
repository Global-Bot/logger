const { Logger } = require('@ayana/logger');
const GlobalFormatter = require('./formatter');
const SentryTransport = require('./transports/SentryTransport');

Logger.getDefaultTransport().setLevel('INFO');

function init(options) {
	const consoleTransport = Logger.getDefaultTransport();
	consoleTransport.setLevel(options.logLevel);
	consoleTransport.setFormatter(new GlobalFormatter());

	if (options.sentry) {
		Logger.addTransport(new SentryTransport(options.sentry));
	}
}

module.exports = { init, Logger };