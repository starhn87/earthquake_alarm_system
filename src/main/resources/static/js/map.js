/**
 * DOM 로드 후 동작
 * 
 * @param  {String} "DOMContentLoaded" 돔 구성 완료
 */
document.addEventListener("DOMContentLoaded", () => {
    map.initMap();
})

let map = {
    map: null,
    initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 35.050725, lng: 128.978905 },
            zoom: 16
        });
    }
}