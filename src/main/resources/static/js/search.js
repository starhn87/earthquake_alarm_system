/**
 * DOM 로드 후 동작
 * 
 * @param  {String} "DOMContentLoaded" 돔 구성 완료
 */
document.addEventListener("DOMContentLoaded", () => {
    searchObject.setSearchFunction();
})


/**
 * 검색과 관련된 객체
 */
let searchObject = {

    /**
     * DOM을 구성하고 실행되는 함수
     */
    setSearchFunction() {
        let button = document.querySelector("#searchButton");
        button.addEventListener("click", (event) => {
            event.preventDefault();
            this._requestCharts();
        });
    },

    /**
     * 비동기적인 요청 부분 모듈화
     */
    _requestCharts() {
        let keyword = document.getElementById("keyword").value;
        if (!this._verifyKeyword(keyword)) {
            return;
        }
        let dateArr = this._getDate();
        let startDate = dateArr[0], endDate = dateArr[1];
        if (!this._verifyDate(startDate, endDate)) {
            return;
        }


        let queryString = this._makeQueryString(keyword, startDate, endDate);
        this._ajaxCollection("GET", queryString);
    },

    /**
     * 요청할 ajax 함수들이 순서대로 실행
     * 
     * @param {String} httpMethod 서버에 요청할 행위
     * @param {String} queryString 서버로 보낼 추가 정보 
     */
    _ajaxCollection(httpMethod, queryString) {
        const BASE_URL = "/data";
        const COMMAND = [
            "keyword",
            "transition",
            "association",
        ];
        const CHARTS = {
            "base_data": charts.base_data.createChart.bind(charts.base_data),
            "stacked_column": charts.stacked_column.createChart.bind(charts.stacked_column),
            "word_cloud": charts.word_cloud.createChart.bind(charts.word_cloud),
        }

        let i = 0;
        for (let key in CHARTS) {
            let xmlHttpRequest = new XMLHttpRequest();
            let url = BASE_URL;
            url += "/" + COMMAND[i++] + "?";
            url += queryString;
            let success = this._requestAjax(httpMethod, url, xmlHttpRequest, CHARTS[key], key);
            if (success === false) {
                break;
            }
            xmlHttpRequest.send();
        }
    },

    /**
     * startDate와 endDate를 구함
     * 
     * @return startDate와 endDate가 포함된 배열
     */
    _getDate() {
        let startDate;
        let endDate;

        startDate = document.getElementById("startDate").value;
        endDate = document.getElementById("endDate").value;

        console.log("startDate = " + startDate);
        console.log("endDate = " + endDate);

        return new Array(startDate, endDate);
    },

    /**
     * 키워드 검증
     * 
     * @param {String} keyword 
     * @return 유효성 검증 통과 여부 T/F
     */
    _verifyKeyword(keyword) {
        if (keyword === "") {
            alert("주제어를 입력하세요.");
            return false;
        }
        return true;
    },

    /**
     * 시작일, 종료일 검증
     * 
     * @param {String} startDate 
     * @param {String} endDate 
     * @return 유효성 검증 통과 여부 T/F
     */
    _verifyDate(startDate, endDate) {
        let regx = /^(19|20)\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])$/;
        if (startDate > endDate || !regx.test(startDate) || !regx.test(endDate)) {
            alert("날짜를 올바르게 입력해주세요.");
            return false;
        }

        return true;
    },

    /**
     * String 타입의 날짜를 Date 타입으로 변경
     * 
     * @param {String} startDate 
     * @return String을 변환한 Date
     */
    _convertStringToDate(startDate) {
        let year = startDate.substring(0, 4);
        let month = startDate.substring(4, 6);
        let day = startDate.substring(6, 8);
        return new Date(year, month, day);
    },

    /**
     * 날짜를 포맷
     * 
     * @param {Date} date
     * @return 날짜를 yyyymmdd 형식으로 표현한 String
     */
    _convertDateToString(date) {
        let year = date.getFullYear();

        let month = (1 + date.getMonth());
        month = month >= 10 ? month : '0' + month;

        let day = date.getDate();
        day = day >= 10 ? day : '0' + day;

        return year + '' + month + '' + day;
    },

    /**
     * 파라미터 부분의 url 완성
     * 
     * @param {String} keyword 
     * @param {String} startDate 
     * @param {String} endDate
     * @return 파라미터 부분이 합쳐진 queryString
     */
    _makeQueryString(keyword, startDate, endDate) {
        let queryString = "startDate=" + startDate + "&endDate=" + endDate +
            "&keyword=" + keyword;
        return encodeURI(queryString);
    },

    /**
     * 요청이 정상적으로 응답되면 비동기적으로 callback 함수 실행
     * 
     * @param {String} httpMethod 서버에 요청할 행위
     * @param {String} url 비동기적으로 요청할 api
     * @param {Object} xmlHttpRequest 비동기적으로 요청하는 객체
     * @param {Function} callback 응답 후 실행할 함수
     * @param {String} name 차트 이름
     * @return T/F 여부
     */
    _requestAjax(httpMethod, url, xmlHttpRequest, callback, name) {
        const SUCCESS = 200;
        xmlHttpRequest.open(httpMethod, url, true);
        xmlHttpRequest.onreadystatechange = () => {
            if (xmlHttpRequest.readyState !== xmlHttpRequest.DONE) {
                return false;
            }

            if (xmlHttpRequest.status !== SUCCESS) {
                alert("요청이 정상적으로 처리되지 않았습니다.");
                return false;
            }

            let data = JSON.parse(xmlHttpRequest.response);
            console.log(data);
            callback(name, data);
        }
        return true;
    },
}