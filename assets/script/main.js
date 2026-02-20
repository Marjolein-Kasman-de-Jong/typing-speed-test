import { resetUI, toggleDropdown } from "./manageUI.js";
import { state, resetState } from './state.js';
import { renderAllGameData, toggleSpanClass } from "./renderGameData.js";
import { getItem, setItem } from "./manageLocalStorage.js";
import { startGame, checkUserInput } from "./gameEngine.js";

document.addEventListener("DOMContentLoaded", async () => {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");
    const settingInputs = document.querySelectorAll(
        'input[name="difficulty"], input[name="mode"]'
    );
    const targetTextContainer = document.getElementById("target-text");
    const startButton = document.getElementById("start-button");
    const textInputField = document.getElementById("typing-input");
    
    const getSpans = () => targetTextContainer.querySelectorAll("span");

    settingInputs.forEach(settingInput => {
        settingInput.addEventListener("click", async () => {
            await resetState();
            renderAllGameData(state, targetTextContainer);
            setItem(state);
        });
    });

    // Start game
    startButton.addEventListener("click", () => {
        const spans = getSpans();
        startGame(textInputField, spans);
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

    // UI components
    toggleDropdown(dropdownButtons);

    // Initial
    const stored = getItem() || {};

    await resetState(stored);
    resetUI(state, settingInputs, dropdownButtons);
    renderAllGameData(state, targetTextContainer);
});