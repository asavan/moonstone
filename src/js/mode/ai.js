import rngFunc from "../utils/random.js";

export default async function ai({document, rngEngine}) {
    const myArticle = document.querySelector("blockquote");

    const myRequest = new Request("./cruzo.txt_Ascii.txt");
    const text = await fetch(myRequest).then((response) => response.text());
    const sentences = text.split(/[\\.!\\?]/);

    const randSentence = rngFunc.randomEl(sentences, rngEngine);
    myArticle.textContent = randSentence.trim();
}
