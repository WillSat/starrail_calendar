const beginEle = document.getElementById('textarea_begin'),
    eventsEle = document.getElementById('textarea_events'),
    endEle = document.getElementById('textarea_end');

class vEvent {
    constructor(start, end, summary, categories) {
        this.uid = this.generateUUID();
        this.start = start;
        this.end = end;
        this.summary = summary;
        this.categories = categories;
    }

    generateUUID() {
        if (typeof crypto === 'object') {
            if (typeof crypto.randomUUID === 'function') {
                return crypto.randomUUID();
            }
            if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
                const callback = (c) => {
                    const num = Number(c);
                    return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16);
                };
                return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, callback);
            }
        }
        let timestamp = new Date().getTime();
        let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0;
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            let random = Math.random() * 16;
            if (timestamp > 0) {
                random = (timestamp + random) % 16 | 0;
                timestamp = Math.floor(timestamp / 16);
            } else {
                random = (perforNow + random) % 16 | 0;
                perforNow = Math.floor(perforNow / 16);
            }
            return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
        });
    }

    output() {
        return `BEGIN:VEVENT\nUID:${this.uid}\nDTSTART;VALUE=DATE:${this.start}\nDTEND;VALUE=DATE:${this.end}\nCLASS:PUBLIC\nSUMMARY;LANGUAGE=zh_CN:${this.summary}\nTRANSP:TRANSPARENT\nCATEGORIES:${this.categories}\nEND:VEVENT`;
    }
}

eventsEle.addEventListener('change', function() {
    this.value = this.value.replaceAll(/\s*,\s*$/g, '').replaceAll(/\s*,\s*/g, ', ');
})

function generate() {
    const eventsArr = [];
    for (const event of eventsEle.value.split('\n')) {
        const argList = event.trim().replaceAll(/\s*,\s*$/g, '').replaceAll(/\s*,\s*/g, ',').split(',');
        if (argList.length === 4) {
            eventsArr.push((new vEvent(...argList)).output());
        }
    }

    console.log([beginEle.value, eventsArr.join('\n'), endEle.value].join('\n'));
}