# @global-bot/logger
Global - Logger

<!---->

## Usage
### Log methods
* error
* warn
* info
* debug
* trace

### Log level
Log levels have a hierarchy as seen below, some log methods will not work if the current log level set is lower on the hierarchy than the method trying to run.
By default the log level is set to "INFO", it can be changed with the `init` function by passing in an object argument with a `logLevel` property.
For example, if the log level is set to `INFO` and the `trace` method is ran, it will output nothing as `INFO` is lower than `TRACE` on the hierarchy.
The `TRACE` method can then be used by setting the log level to `TRACE`.
* OFF = -1,
* ERROR = 0,
* WARN = 1,
* INFO = 2,
* DEBUG = 3,
* TRACE = 4

<!---->

## Examples
#### Basic
```js
const globalLogger = require('@global-bot/logger');

// [2021-08-16 00:56:17:547] 🆗 INFO [logtest:Server] some infomative server log
globalLogger.Logger.get('Server').info('some infomative server log');
```

#### Best
logger.js
```js
const { init, Logger } = require('@global-bot/logger');
init({ logLevel: 'TRACE' });

module.exports = Logger;
```

server.js
```js
const logger = require('./logger').get('Server');

// [2021-08-16 00:59:29:013] ⚙ TRACE [logtest:Server/userData] Tracing some server stuff...
logger.trace('Tracing some server stuff...', 'userData');
```