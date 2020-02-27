/**
 * DOM 로드 후 동작
 * 
 * @param  {String} "DOMContentLoaded" 돔 구성 완료
 */
document.addEventListener("DOMContentLoaded", () => {
    chart._makeChart();
})

/**
 * 지진 현황 표 관련 객체
 */
let chart = {
    _content: "<thead id='eq-chart-header'>\
                <tr>\
                    <th class='eq-area'>지역</th>\
                    <th class='eq-level'>규모</th>\
                    <th class='eq-year'>연도</th>\
                    <th class='eq-freq'>횟수</th>\
                </tr>\
            </thead>\
            <tbody id='eq-chart'>",

    /**
     * 지진 현황 표 만듬
     */
    _makeChart() {
        fetch("http://localhost:8080/data/chart/earthquake")
            .then((receive) => {
                receive.json().then(results => {
                    let content = this._content;
                    results.forEach((data) => {
                        content += this._makeEqData(data);
                    })
                    content += "</tbody>"
                    document.getElementById("eq-table").innerHTML = content;
                });
            })
    },

    /**
     * 지진 현황 데이터를 html화
     * 
     * @param {Object} data 
     */
    _makeEqData(data) {
        let tmp = "<tr><td class='eq-area'>" + data.area + "</td>";
        tmp += "<td class='eq-level'>" + "리히터 " + data.level + " 이상" + "</td>";
        tmp += "<td class='eq-year'>" + data.year.substr(0, 4) + "</td>";
        tmp += "<td class='eq-freq'>" + data.frequency + "</td>";
        tmp += "</tr>";
        return tmp;
    }
}
