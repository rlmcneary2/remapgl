// import isDev from "../is-dev/is-dev";

export function debug(category: string, callback: ConsoleArgsCallback) {
  logMessage("debug", category, callback);
}

type ConsoleArgsCallback = (category: string) => string | [string, any[]];

const mapTypeToConsole = Object.freeze({
  debug: "log"
});

const mapTypeToLevel = Object.freeze({
  debug: true
});

function logMessage(
  type: "debug",
  category: string,
  callback: ConsoleArgsCallback
) {
  if (!mapTypeToLevel[type]) {
    return;
  }

  const result = callback(category);
  const [message, args] = Array.isArray(result) ? result : [result, []];
  console[mapTypeToConsole[type]](message, ...args);
}
