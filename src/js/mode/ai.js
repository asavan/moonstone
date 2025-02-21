import rngFunc from "../utils/random.js";
import sentences from "../loader.js";
import storageFunc from "../stoage.js";
import { delay } from "../utils/timer.js";

function makeToast(document, settings) {
    // Create an element and make it into a popover
    const popover = document.createElement("article");
    popover.popover = "manual";
    popover.classList.add("toast");
    popover.classList.add("newest");

    const msg = "Бесплатные советы на сегодня закончились!";

    // Give the toast its text content, and add it to the DOM
    popover.textContent = msg;
    document.body.appendChild(popover);

    // Show the popover
    popover.showPopover();

    // Remove the toast again after 4 seconds
    setTimeout(() => {
        popover.hidePopover();
        popover.remove();
    }, settings.toastDelay);

    // When a new toast appears, run the movetoastsUp() function
    popover.addEventListener("toggle", (event) => {
        console.log(event);
    });
}

export default async function ai({document, window, settings, rngEngine}) {
    const myArticle = document.querySelector("blockquote");
    const btn = document.querySelector(".js-btn");
    const stoage = storageFunc(window, settings);
    const inStorage = stoage.getValue();
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (stoage.getClicks() >= settings.daylimit) {
            makeToast(document, settings);
            return;
        }
        const randSentence = rngFunc.randomEl(sentences, rngEngine);
        const toStorage = randSentence.trim();
        stoage.afterClick(toStorage);
        myArticle.textContent = toStorage;
    });

    if (inStorage) {
        myArticle.textContent = inStorage;
        return;
    }

    const randSentence = rngFunc.randomEl(sentences, rngEngine);
    const toStorage = randSentence.trim();
    stoage.save(toStorage);
    myArticle.textContent = toStorage;
    await delay(100);
}
