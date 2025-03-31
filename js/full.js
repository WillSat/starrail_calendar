const eventListEle = document.getElementById('event_list');

{
    fetch('full.json')
        .then(e => e.json())
        .then(list => randerList(list));
    
    // 
    function randerList(list) {
        const tempArr = [];
        for (const event of list) {
            if (event.length !== 0) {
                tempArr.push(createListItem(...event));
            }
        }

        for (const element of tempArr) {
            eventListEle.appendChild(element);
        }
    }

    // 
    function createListItem(beg, end, sum, des, rrule) {
        const wrapperEle = $('div', 'listitem');
        const sumEle = $('div', 'itemtitle');
        const dtEle = $('div', 'itemdatetime');
        const begSpan = $('span', 'itembeginspan');
        const endSpan = $('span', 'itemendspan');
        const desEle = $('div', 'itemdesc');

        sumEle.textContent = sum;
        begSpan.textContent = beg;
        endSpan.textContent = end ?? '';
        desEle.textContent = des ?? '';
        if (rrule) desEle.innerHTML += `<br>RRULE:${rrule}`;

        dtEle.appendChild(begSpan);
        dtEle.appendChild(endSpan);

        wrapperEle.appendChild(sumEle);
        wrapperEle.appendChild(dtEle);
        wrapperEle.appendChild(desEle);

        // ver_update
        if (sum.match(/[\d\.]+[上下]半开启/)) {
            wrapperEle.setAttribute('ver_update', 'ver_update');
        }

        // chall_update
        if (sum === '混沌回忆更新' || sum === '虚构叙事更新' || sum === '末日幻影更新') {
            wrapperEle.setAttribute('chall_update', 'chall_update');
        }

        // RRULE
        if (rrule) {
            wrapperEle.setAttribute('rrule', 'rrule');
        }

        return wrapperEle;

        function $(e, cN) {
            const x = document.createElement(e);
            x.classList.add(cN);
            return x;
        }
    }
}