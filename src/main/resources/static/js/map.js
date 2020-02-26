/**
 * DOM 로드 후 동작
 * 
 * @param  {String} "DOMContentLoaded" 돔 구성 완료
 */
document.addEventListener("DOMContentLoaded", () => {
    //let a = map.initMap();
})

let map;
let pos;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.050725, lng: 128.978905 },
        zoom: 14
    });
    
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            
            map.setCenter(pos);
            let infowindow = new google.maps.InfoWindow;
            infowindow.setContent("현재 위치");
            let latLng = new google.maps.LatLng(pos.lat, pos.lng);
            let marker = new google.maps.Marker({
                position: latLng, //여기에 위도 경도 정보를 입력하고 마커 생성
                map: map,
            });
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        }, function () {
            handleLocationError(true, infowindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infowindow, map.getCenter());
    }

    fetch("http://localhost:8080/shelter/Marker/first?" + "latitude=" + "35.050725" + "&" + "longitude=" + "128.978905").then((receive) => {
        receive.json().then((results) => {
            console.log(results);
            if (results.datas == undefined || results.datas == null)
                return;
            for (let i = 0; i < results.datas.length; i++) {
                let contentString = "<div>" + results.datas[i].name + "</div>";
                contentString += "<div>" + results.datas[i].jibun + "</div>"

                let latLng = new google.maps.LatLng(results.datas[i].coordinates[0], results.datas[i].coordinates[1]); //위도 경도 변수
                let infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 300
                });

                let marker = new google.maps.Marker({
                    position: latLng, //여기에 위도 경도 정보를 입력하고 마커 생성
                    map: map,
                    id: results.datas[i].id
                });
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });
            }
        });
    })

    fetch("http://localhost:8080/shelter/Marker/others?" + "latitude=" + "35.050725" + "&" + "longitude=" + "128.978905").then((receive) => {
        receive.json().then((results) => {
            console.log(results);
            if (results.datas == undefined || results.datas == null)
                return;
            for (let i = 0; i < results.datas.length; i++) {
                let contentString = "<div>" + results.datas[i].name + "</div>";
                contentString += "<div>" + results.datas[i].jibun + "</div>"

                let latLng = new google.maps.LatLng(results.datas[i].coordinates[0], results.datas[i].coordinates[1]); //위도 경도 변수
                let infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 300
                });

                let marker = new google.maps.Marker({
                    position: latLng, //여기에 위도 경도 정보를 입력하고 마커 생성
                    map: map,
                    id: results.datas[i].id
                });
                marker.addListener('click', function () {
                    infowindow.open(map, marker);
                });
            }
        });
    })
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
