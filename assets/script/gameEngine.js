import { state } from './state.js';
import { toggleSpanClass } from './renderGameData.js';

function checkUserInput(textInputField, spans) {
    const userInput = textInputField.value;

    spans.forEach((span, i) => {
        const typed = userInput[i];
        let status;

        if (typed === span.textContent) {
            status = "correct";
        } else {
            if (typed === undefined) {
                if (i === userInput.length) {
                    status = "active";
                } else {
                    return;
                };
            } else {
                status = "incorrect";
            };
        };

        toggleSpanClass(span, status);
    });
};

export function startGame(textInputField, targetTextContainer) {
    const spans = targetTextContainer.querySelectorAll("span");

    textInputField.focus();
    textInputField.value = "";
    
    spans[0].classList.add("active");

    textInputField.addEventListener("input", (e) => {
        checkUserInput(textInputField, spans);
    });
};