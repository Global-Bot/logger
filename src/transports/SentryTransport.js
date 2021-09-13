const { Transport, LogLevel } = require('@ayana/logger');
const Raven = require('raven');

class SentryTransport extends Transport {
    constructor(options = {}) {
        options = Object.assign({ stderrMinLevel: LogLevel.WARN }, options);
        super(options);

        this.sentryLevels = {
            ERROR: 'error',
            WARN: 'warning',
            INFO: 'info',
            DEBUG: 'debug',
            TRACE: 'debug'
        }
        this.sentryTags = options.tags || {}
        this.disableCapture = options.disableCapture == true;
        
        try {
            Raven.config(this.options.dsn, this.options);
        } catch (error) {
            console.error('[Sentry/Raven.config]', error);
        }

        Raven.on('error', console.error.bind(this, '[Sentry/Raven.error]'));
    }

    print({ level, input, extra, uniqueMarker }) {
        if (level != LogLevel.ERROR)
            return null;

        if (typeof input == 'function')
            input = input();
        
        extra = {
            level: this.sentryLevels[level],
            tags: this.sentryTags,
            extra, uniqueMarker
        };

        try {
            if (this.disableCapture) return;

            Raven.captureException(input, extra);
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = SentryTransport