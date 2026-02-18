import { capitalizeFirstLetter } from "./utilities/capitalizeFirstLetter.js";

function updateDropdownButtonText(dropdownButton, text) {
  dropdownButton.querySelector(".text-preset-5").textContent = capitalizeFirstLetter(text);
};

function toggleSettingInputs(state, settingInputs, dropdownButtons) {
  const difficulty = state.difficulty;
  let mode = state.mode;

  settingInputs.forEach(settingInput => {
    settingInput.checked = false;

    if (settingInput.value === difficulty) {
      settingInput.checked = true;
    };

    if (settingInput.value === mode) {
      settingInput.checked = true;
    };
  });

  // dropdownButtons.forEach(dropdownButton => {
  //   if (!dropdownButton.offsetParent) {
  //     return
  //   };

  //   if (dropdownButton.offsetParent.classList.contains("difficulty")) {
  //     updateDropdownButtonText(dropdownButton, difficulty);
  //   };

  //   if (dropdownButton.offsetParent.classList.contains("mode")) {
  //     if (mode === "timed") {
  //       mode = "timed(60s)";
  //     };

  //     updateDropdownButtonText(dropdownButton, mode);
  //   };
  // });

  dropdownButtons.forEach((dropdownButton) => {
    const dropdown = dropdownButton.closest(".dropdown");
    if (!dropdown) return;

    if (dropdown.classList.contains("difficulty")) {
      updateDropdownButtonText(dropdownButton, difficulty);
    }

    if (dropdown.classList.contains("mode")) {
      const label = mode === "timed" ? "timed(60s)" : mode;
      updateDropdownButtonText(dropdownButton, label);
    }
  });
};

export function toggleDropdown(dropdownButtons) {
  dropdownButtons.forEach((dropdownButton) => {
    const panel = dropdownButton.nextElementSibling;
    const dropdown = dropdownButton.closest(".dropdown");

    // Toggle when clicking the button
    dropdownButton.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent the document click from firing

      // Close all other dropdown panels
      dropdownButtons.forEach((btn) => {
        const otherPanel = btn.nextElementSibling;
        if (otherPanel !== panel) {
          otherPanel.classList.add("closed");
        }
      });

      // Toggle the current one
      panel.classList.toggle("closed");
    });

    // Close when clicking a radio option
    const inputs = panel.querySelectorAll("input");

    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        panel.classList.add("closed");

        const labelText = input.nextElementSibling.textContent;
        updateDropdownButtonText(dropdownButton, labelText)
      });
    });

    // Close when clicking outside the dropdown
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        panel.classList.add("closed");
      }
    });
  });
};

export function resetUI(state, settingInputs, dropdownButtons) {
  toggleSettingInputs(state, settingInputs, dropdownButtons);
};