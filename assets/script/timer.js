function formatElapsedTime(state, ms) {
  const totalSeconds = state.mode === "timed" ? 60 - Math.floor(ms / 1000) : Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export function renderElapsedTime(state, elapsedTimeElement) {
  if (!state.startTime) {
    elapsedTimeElement.textContent = "0.00";
    return;
  };

  const elapsedMs = Date.now() - state.startTime;
  elapsedTimeElement.textContent = formatElapsedTime(state, elapsedMs);
};

export function stopElapsedTimer(state) {
  if (state.timerId != null) {
    clearInterval(state.timerId);
    state.timerId = null;
  };
};

export function startElapsedTimer(state, elapsedTimeElement) {
  // voorkom dubbele timers
  stopElapsedTimer(state);

  // meteen iets tonen
  renderElapsedTime(state, elapsedTimeElement);

  state.timerId = window.setInterval(() => {
    renderElapsedTime(state, elapsedTimeElement);
  }, 100); // 10x per seconde is soepel genoeg
};
