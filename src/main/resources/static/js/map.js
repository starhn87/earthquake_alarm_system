/**
 * DOM 로드 후 동작
 * 
 * @param  {String} "DOMContentLoaded" 돔 구성 완료
 */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#submit_button").addEventListener("click", (event) => {
        requestLocation();
    })
})



let map;
let pos;
let infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.050725, lng: 128.978905 },
        zoom: 14
    });
    console.log("map: " + map);

    initAutocomplete();

    getPosition().then((p) => {
        getMarker("first", p);
        getMarker("others", p);
    })


}

function getPosition() {
    return new Promise((resolve, reject) => {
        infoWindow = new google.maps.InfoWindow({
            content: "현재 위치",
        });
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                map.setCenter(pos);
                let latLng = new google.maps.LatLng(pos.lat, pos.lng);
                let marker = new google.maps.Marker({
                    position: latLng, //여기에 위도 경도 정보를 입력하고 마커 생성
                    map: map,
                    width: 300,
                    height: 500,
                });
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                marker.addListener('click', function () {
                    infoWindow.open(map, marker);
                });
                resolve(pos);
            }, function () {
                reject("fail");
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            reject("fail");
            handleLocationError(false, infoWindow, map.getCenter());
        }
    })

}

function getMarker(path, p) {
    console.log(p)
    fetch("http://localhost:8080/shelter/Marker/" + path + "?latitude=" + p.lat + "&" + "longitude=" + p.lng).then((receive) => {
        receive.json().then((results) => {
            console.log(results);
            if (results.datas == undefined || results.datas == null)
                return;
            for (let i = 0; i < results.datas.length; i++) {
                let contentString = "<h3>" + results.datas[i].name + "</h3>";
                contentString += "<div><span style='color:white;background-color:orange;border:solid orange 1px;'>지번</span>" + results.datas[i].jibun + "</div>"
                contentString += "<div><span style='color:white;background-color:red;border:solid red 1px;'>전화</span>" + results.datas[i].phone + "</div>"
                contentString += "<div><B>수용인원: </B>" + results.datas[i].capacity + "</div>";

                let latLng = new google.maps.LatLng(results.datas[i].coordinates[0], results.datas[i].coordinates[1]); //위도 경도 변수
                let infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 300,
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
