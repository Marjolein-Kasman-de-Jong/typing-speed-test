import { resetUI, toggleDropdown } from "./manageUI.js";
import { state, resetState } from './state.js';
import { renderAllGameData } from "./renderGameData.js";
import { getItem, setItem } from "./manageLocalStorage.js";

document.addEventListener("DOMContentLoaded", async () => {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");
    const settingInputs = document.querySelectorAll(
        'input[name="difficulty"], input[name="mode"]'
    );
    const targetTextContainer = document.getElementById("target-text");

    settingInputs.forEach(settingInput => {
        settingInput.addEventListener("click", async () => {
            await resetState();
            renderAllGameData(state, targetTextContainer);
            setItem(state);
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