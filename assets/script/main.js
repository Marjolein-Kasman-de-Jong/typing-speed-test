import { toggleDropdown } from "./toggleDropdown.js";

document.addEventListener("DOMContentLoaded", () => {
    const dropdownButtons = document.querySelectorAll(".dropdown-button");

    toggleDropdown(dropdownButtons);
});