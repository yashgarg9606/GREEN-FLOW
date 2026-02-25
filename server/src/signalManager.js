const SIGNAL_COUNT = 4;

let signals = Array.from({ length: SIGNAL_COUNT }, (_, i) => ({
  signal_id: i + 1,
  state: "GREEN",
  remaining_time: 30,
}));

let currentGreenIndex = 0;

function tickSignals(io) {
  signals.forEach((signal, index) => {
    if (index === currentGreenIndex) {
      signal.remaining_time -= 1;

      if (signal.remaining_time <= 0) {
        signal.state = "RED";
        signal.remaining_time = 30;

        currentGreenIndex = (currentGreenIndex + 1) % SIGNAL_COUNT;

        signals[currentGreenIndex].state = "GREEN";
        signals[currentGreenIndex].remaining_time = 30;
      }
    }
  });

  io.emit("signals:update", signals);
}

function getSignals() {
  return signals;
}

module.exports = { tickSignals, getSignals };