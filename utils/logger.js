const {createLogger, format, transports} = require('winston')

module.exports = createLogger({
    format: format.combine(
        format.simple(),
        format.json(),
        format.timestamp(),
        format.printf(info => `[${info.timestamp}] ${info.level} : ${info.message}`)
    ),
    
    transports: [
        new transports.File({
            filename:`${__dirname}/../logs/logging.log`,
        }),
        new transports.Console({
            level: 'debug',
        })
    ]
})