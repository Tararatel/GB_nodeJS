// Аргумент можно вводить в формате: 2011-10-10T14:48:00 или 2011-10-10

const arg = process.argv[2];
const EventEmitter = require("events");
const emitter = new EventEmitter();

function getTimeRemaining(arg) {
  const t = Date.parse(arg) - Date.parse(new Date()),
    days = Math.floor(t / (1000 * 60 * 60 * 24)),
    hours = Math.floor((t / (1000 * 60 * 60)) % 24),
    minutes = Math.floor((t / 1000 / 60) % 60),
    seconds = Math.floor((t / 1000) % 60);

  return {
    total: t,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}

function setClock(arg) {
  const timeInterval = setInterval(updateClock, 1000);

  updateClock();

  function stopTimer() {
    clearInterval(timeInterval);
  }

  function updateClock() {
    const t = getTimeRemaining(arg);

    emitter.emit("remainder", t);

    if (t.total <= 0) {
      stopTimer();
      console.log("Время вышло!");
    }
  }
}

emitter.on("remainder", console.log);

setClock(arg);
