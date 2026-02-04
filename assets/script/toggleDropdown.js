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
        dropdownButton.querySelector(".text-preset-5").textContent = labelText;
      });
    });

    // Close when clicking outside the dropdown
    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        panel.classList.add("closed");
      }
    });
  });
}