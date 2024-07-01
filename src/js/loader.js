const myRequest = new Request("./cruzo.txt_Ascii.txt");
const text = await fetch(myRequest).then((response) => response.text());
const sentences = text.split(/[\\.!\\?]/);

export default sentences;
