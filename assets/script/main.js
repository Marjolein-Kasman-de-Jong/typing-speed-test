import { resetUI, toggleDropdown } from "./manageUI.js";
import { state, resetState } from './state.js';
import { renderAllGameData, toggleSpanClass, clearAllSpans } from "./renderGameData.js";
import { getItem, setItem } from "./manageLocalStorage.js";
import { startGame, stopGame, checkUserInput } from "./gameEngine.js";
import { startElapsedTimer, stopElapsedTimer, renderElapsedTime } from "./timer.js";

document.addEventListener("DOMContentLoaded", async () => {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");
    const settingInputs = document.querySelectorAll(
        'input[name="difficulty"], input[name="mode"]'
    );
    const targetTextContainer = document.getElementById("target-text");
    const startButton = document.getElementById("start-button");
    const stopButton = document.getElementById("stop-button");
    const textInputField = document.getElementById("typing-input");
    const restartButton = document.getElementById("restart-button");
    const elapsedTimeElement = document.getElementById("elapsed-time");
    
    const getSpans = () => targetTextContainer.querySelectorAll("span");

    // Start game
    startButton.addEventListener("click", () => {
        const spans = getSpans();
        startGame(state, textInputField, spans, startElapsedTimer, stopElapsedTimer,  elapsedTimeElement);
    });

    // Play game
    textInputField.addEventListener("input", (e) => {
        // Check user input
        const spans = getSpans();
        let spanStatuses = checkUserInput(textInputField, spans);
        // Update UI
        spanStatuses.forEach(spanStatus => {
            const [span, status] = spanStatus;
            toggleSpanClass(span, status);
        });
    });

    // End game
    stopButton.addEventListener("click", () => {
        stopGame(state, stopElapsedTimer);
    });

    // Restart game
    restartButton.addEventListener("click", () => {
        const spans = getSpans();

        resetUI(state, settingInputs, dropdownButtons);
        clearAllSpans(spans);
        startGame(state, textInputField, spans, startElapsedTimer, stopElapsedTimer, elapsedTimeElement);
    });

    // UI components
    settingInputs.forEach(settingInput => {
        settingInput.addEventListener("click", async () => {
            stopElapsedTimer(state);
            await resetState();
            renderAllGameData(state, targetTextContainer, renderElapsedTime, elapsedTimeElement);
            setItem(state);
        });
    });

    toggleDropdown(dropdownButtons);

    // Initial
    const stored = getItem() || {};

    await resetState(stored);
    resetUI(state, settingInputs, dropdownButtons);
    renderAllGameData(state, targetTextContainer, renderElapsedTime, elapsedTimeElement);
});