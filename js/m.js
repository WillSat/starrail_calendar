const beginEle = document.getElementById('textarea_begin'),
    eventsEle = document.getElementById('textarea_events'),
    endEle = document.getElementById('textarea_end');

function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return `${str.length.toString(16)}${hash.toString(16)}`;
}

class vEvent {
    constructor(start, end, summary, desc, rrule) {
        this.uid = hashString(`${start}${end}${summary}${desc}${rrule}`);
        this.start = start;
        this.end = end;
        this.summary = summary;
        this.desc = desc;
        this.rrule = rrule;
    }

    output() {
        const tempArr = [`BEGIN:VEVENT\nUID:${this.uid}\nDTSTART;TZID=Asia/Shanghai:${this.start}\n`];
        if (this.end) tempArr.push(`DTEND;TZID=Asia/Shanghai:${this.end}\n`);
        if (this.rrule) tempArr.push(`RRULE:${this.rrule}\n`);
        tempArr.push(`SUMMARY:${this.summary}\n`);
        if (this.desc) tempArr.push(`DESCRIPTION:${this.desc}\n`);
        tempArr.push(`END:VEVENT`);
        return tempArr.join('');
    }
}

function generate() {
    const eventsArr = [];
    const str = eventsEle.value;
    const tempArr = JSON.parse(str);
    for (const subArr of tempArr) {
        eventsArr.push((new vEvent(...subArr)).output());
    }

    console.log([beginEle.value, eventsArr.join('\n'), endEle.value].join('\n'));
}