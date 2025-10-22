export default function storage(window, settings) {
    const dataRaw = window.sessionStorage.getItem(settings.dataName);
    let dataParsed;
    let clickCount = 0;
    if (dataRaw) {
        const dataParsed1 = JSON.parse(dataRaw);
        dataParsed1.date = new Date(dataParsed1.date);
        const now = new Date();
        if (dataParsed1.date.toDateString() === now.toDateString()) {
            dataParsed = dataParsed1;
            const clickCount1 = Number.parseInt(dataParsed1.clickCount, 10);
            if (clickCount1 && !Number.isNaN(clickCount1)) {
                clickCount = clickCount1;
            }
        }
    }
    function getValue() {
        if (!dataRaw) {
            return;
        }
        if (!dataParsed) {
            return;
        }
        const now = new Date();
        if (dataParsed.date.toDateString() === now.toDateString()) {
            return dataParsed.value;
        }
    }
    function save(str) {
        const now = new Date();
        const toSave = {value: str, date: now, clickCount};
        window.sessionStorage.setItem(settings.dataName, JSON.stringify(toSave));
    }

    function afterClick(str) {
        ++clickCount;
        save(str);
    }

    function getClicks() {
        console.log(clickCount);
        return clickCount;
    }

    return {
        getValue, save, getClicks, afterClick
    };
}
