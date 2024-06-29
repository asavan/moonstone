import settingsOriginal from "./settings.js";
import { parseSettings, adjustSeed } from "./utils/parse-settings.js";
import rngFunc from "./utils/random.js";
import aiMode from "./mode/ai.js";

export default function starter(window, document) {
    const settings = { ...settingsOriginal };
    const changed = parseSettings(window.location.search, settings);
    const rngEngine = Math.random;
    adjustSeed(changed, settings, rngFunc, rngEngine);

    aiMode({ window, document, settings: Object.freeze(settings), rngEngine }).
        catch((error) => {
            console.error(error);
        });
}
