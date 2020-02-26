/**
 * DOM 로드 후 동작
 * 
 * @param  {String} "DOMContentLoaded" 돔 구성 완료
 */
document.addEventListener("DOMContentLoaded", () => {
})

let map;
let infoWindow;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 36.11, lng: 129.37 },
        zoom: 14
    });


    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent(getAddressFromLatLng(pos.lat, pos.lng));
            map.setCenter(pos);
            let latLng = new google.maps.LatLng(pos.lat, pos.lng);
            let marker = new google.maps.Marker({
                position: latLng, //여기에 위도 경도 정보를 입력하고 마커 생성
                map: map,
            });
            marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            infoWindow.open(map, marker);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    fetch("http://localhost:8080/shelter/Marker").then((receive) => {
        receive.json().then((results) => {
            console.log(results);
            for (let i = 0; i < results.datas.length; i++) {
                let contentString = "<div>" + results.datas[i].name + "</div>";
                let infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 300
                });
                contentString += "<div>" + results.datas[i].jibun + "</div>"

                let latLng = new google.maps.LatLng(results.datas[i].coordinates[0], results.datas[i].coordinates[1]); //위도 경도 변수

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

let getAddressFromLatLng = async (lat, lng) => {
    const formattedAddress = await Geocode.fromLatLng(lat, lng).then(
        response => {
            const address = response.results[0].formatted_address;

            return address;
        },
        error => {
            console.log(error);
            toast.error(error, {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    );
    return formattedAddress;
};

