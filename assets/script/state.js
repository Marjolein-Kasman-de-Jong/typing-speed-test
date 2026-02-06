export const state = {
    mode: '',
    difficulty: '',
    text: '',
    currentIndex: 0,
    startTime: null,
    endTime: null,
    errors: 0
};

function getCheckedValue(groupName) {
    const checked = document.querySelector(`input[name="${groupName}"]:checked`);
    return checked ? checked.value : null;
};

function getSettings() {
    return {
        difficulty: getCheckedValue("difficulty"),
        mode: getCheckedValue("mode")
    };
};

async function loadTexts() {
    const res = await fetch("../../data/data.json");
    const data = await res.json();

    return data;
};

async function getText(difficulty) {
    const allTexts = await loadTexts();
    const listOfTexts = allTexts[difficulty];
    const randomIndex = Math.floor(Math.random() * listOfTexts.length);
    const selectedText = listOfTexts[randomIndex].text;
   
    return selectedText;
};

export async function resetState({mode, difficulty} = {}) {
    const settings = getSettings();
    const modeToSet = mode ?? settings.mode;
    const difficultyToSet = difficulty ?? settings.difficulty;

    state.difficulty = difficultyToSet;
    state.mode = modeToSet;
    state.text = await getText(difficultyToSet);
    state.currentIndex = 0;
    state.startTime = null;
    state.endTime = null;
    state.errors = 0;
};