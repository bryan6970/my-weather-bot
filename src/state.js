import fs from "fs";

const STATE_FILE = "./state.json";

export function loadState() {
    try {
        const raw = fs.readFileSync(STATE_FILE, "utf8");
        return JSON.parse(raw);
    } catch {
        return { hoursSinceRain: 999 };
    }
}

export function saveState(state) {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}
