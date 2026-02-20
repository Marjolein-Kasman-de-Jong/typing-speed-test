export const state = {
    mode: '',
    difficulty: '',
    text: '',
    currentIndex: 0,
    startTime: null,
    endTime: null,
    errors: 0
};

export function setStartTime(value) {
    state.startTime = value;
    console.log("startTime changed:", value);
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
    const url = new URL("../../data/data.json", import.meta.url);
    const res = await fetch(url);
    
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
    state.startTime = Date.now();
    state.endTime = null;
    state.errors = 0;
};