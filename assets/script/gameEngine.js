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

export function startGame(textInputField, spans, setStartTime) {
    textInputField.focus();
    textInputField.value = "";
    
    spans[0].classList.add("active");

    setStartTime(Date.now());
};