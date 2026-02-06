export function setItem(state) {
    const stateToLocalStorage = {
        mode: state.mode,
        difficulty: state.difficulty,
    };

    localStorage.setItem("typingSpeedTest", JSON.stringify(stateToLocalStorage));
};

export function getItem() {
    const stored = localStorage.getItem("typingSpeedTest");
    
    return stored ? JSON.parse(stored) : null;
};