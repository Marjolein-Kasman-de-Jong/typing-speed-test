export function checkUserInput(textInputField, spans) {
    const userInput = textInputField.value;
    const spanStatuses = [];

    spans.forEach((span, i) => {
        const typed = userInput[i];
        let status;

        if (typed === span.textContent) {
            status = "correct";
        } else {
            if (typed === undefined) {
                if (i === textInputField.length) {
                    status = "active";
                } else {
                    return;
                };
            } else {
                status = "incorrect";
            };
        };

        spanStatuses.push([span, status]);
    });

    return spanStatuses;
};

export function startGame(state, textInputField, spans, startElapsedTimer, stopElapsedTimer, elapsedTimeElement) {
    textInputField.focus();
    textInputField.value = "";

    spans[0].classList.add("active");

    stopElapsedTimer(state);

    state.startTime = Date.now();
    state.endTime = null;

    startElapsedTimer(state, elapsedTimeElement);
};

export function endGame(state, stopElapsedTimer) {
    state.endTime = Date.now();
    stopElapsedTimer(state);
};

export function stopGame(state, stopElapsedTimer) {
    stopElapsedTimer(state);
};