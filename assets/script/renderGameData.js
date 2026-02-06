function renderTargetText(targetText, targetTextContainer) {
    targetTextContainer.textContent = targetText;
};

export function renderAllGameData(state, targetTextContainer) {
    const targetText = state.text;

    renderTargetText(targetText, targetTextContainer);
};