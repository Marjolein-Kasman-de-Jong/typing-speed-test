import { resetUI, toggleDropdown } from "./manageUI.js";
import { state, resetState } from './state.js';
import { renderAllGameData } from "./renderGameData.js";
import { getItem, setItem } from "./manageLocalStorage.js";
import { startGame } from "./gameEngine.js";

document.addEventListener("DOMContentLoaded", async () => {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");
    const settingInputs = document.querySelectorAll(
        'input[name="difficulty"], input[name="mode"]'
    );
    const targetTextContainer = document.getElementById("target-text");
    const startButton = document.getElementById("start-button");
    const textInputField = document.getElementById("typing-input");

    settingInputs.forEach(settingInput => {
        settingInput.addEventListener("click", async () => {
            await resetState();
            renderAllGameData(state, targetTextContainer);
            setItem(state);
        });
    });

    startButton.addEventListener("click", () => {
        startGame(textInputField, targetTextContainer);
    });

    // UI components
    toggleDropdown(dropdownButtons);

    // Initial
    const stored = getItem() || {};

    await resetState(stored);
    resetUI(state, settingInputs, dropdownButtons);
    renderAllGameData(state, targetTextContainer);
});