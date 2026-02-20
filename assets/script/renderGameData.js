function renderTargetText(targetText, targetTextContainer) {
    targetTextContainer.innerHTML = "";

    [...targetText].forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        targetTextContainer.appendChild(span);
    });
};

export function clearAllSpans(spans) {
    spans.forEach(span => {
        span.classList.remove("active", "correct", "incorrect");
    });
};

export function toggleSpanClass(span, status) {
    span.classList.remove("active", "correct", "incorrect");
    span.classList.add(status);
};

export function renderAllGameData(state, targetTextContainer, renderElapsedTime, elapsedTimeElement) {
    const targetText = state.text;

    renderTargetText(targetText, targetTextContainer);
    renderElapsedTime(state, elapsedTimeElement);
};