/**
 * 검색 관련 객체
 */
let search = {
    _url: "https://maps.googleapis.com/maps/api/geocode/json?"
        + "key=AIzaSyA5EAI-XpCh6IL__6e-HL49CgXB2CW1dyg&address=",

    /**
     * Enter 키에 이벤트 추가
     */
    addEnterEvent() {
        const ENTER = 13;
        if (event.keyCode === ENTER) {
            this.changeCenter();
        }
    },

    /**
     * 검색한 값의 경도, 위도를 통해
     * 지도 화면에서 보여지는 위치 변경
     */
    changeCenter() {
        let address = document.getElementById("address").value;
        fetch(this._url + address)
            .then(res => (res.json()
                .then((result) => {
                    console.log(result);
                    map.map.setCenter(result.results[0].geometry.location);
                })))
    },

    /**
     * 검색창에 값 입력시 자동완성기능
     */
    initAutocomplete() {
        let autocomplete = new google.maps.places.Autocomplete((
            document.getElementById('address')), { types: ['geocode'] });
    }
}



