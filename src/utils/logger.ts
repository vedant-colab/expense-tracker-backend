import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty", // optional: human-readable logs
    options: {
      colorize: true,
      translateTime: "SYS:standard",
      ignore: "pid,hostname",
    },
  },
});

export default logger;
