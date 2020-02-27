

document.addEventListener("DOMContentLoaded", () => {
    makeChart();
})

function makeChart() {
    let tbody = "";
    fetch("http://localhost:8080/data/chart/earthquake").then(receive => {
        receive.json().then(results => {
            let content = "<thead id='eq-chart-header'>\
                                <tr>\
                                    <th class='eq-area'>지역</th>\
                                    <th class='eq-level'>규모</th>\
                                    <th class='eq-year'>연도</th>\
                                    <th class='eq-freq'>횟수</th>\
                                </tr>\
                            </thead>\
                            <tbody id='eq-chart'>";
            results.forEach(element => {
                let tmp = "<tr><td class='eq-area'>"+element.area+"</td>";
                tmp+="<td class='eq-level'>"+"리히터 "+element.level+" 이상"+"</td>";
                tmp+="<td class='eq-year'>"+element.year.substr(0,4)+"</td>";
                tmp+="<td class='eq-freq'>"+element.frequency+"</td>";
                tmp+="</tr>"
                content+=tmp;
            })
            content+="</tbody>"
            document.getElementById("eq-table").innerHTML=content;
        });
    })
}