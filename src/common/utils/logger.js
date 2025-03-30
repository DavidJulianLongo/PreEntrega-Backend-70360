import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`
});

export const logger = createLogger({
    level: "debug",
    format: combine(colorize(), timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), customFormat),
    transports: [
        new transports.Console(),
        new transports.File({ filename: "logs/errors.log", level: "error" }),
    ]
})