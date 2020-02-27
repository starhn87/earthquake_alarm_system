/**
 * DOM 로드 후 동작
 * 
 * @param  {String} "DOMContentLoaded" 돔 구성 완료
 */
document.addEventListener("DOMContentLoaded", () => {
    map._initMap();

    let searchButton = document.querySelector("#submit_button");
    searchButton.addEventListener("click", search.changeCenter);
})

/**
 * 지도 관련 객체
 */
let map = {
    map: new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.050725, lng: 128.978905 },
        zoom: 14
    }),
    position: null,

    /**
     * 지도 관련 가장 먼저 실행하는 동작
     */
    _initMap() {
        search.initAutocomplete();
        this._getPosition().then((location) => {
            var centerControlDiv = document.createElement('div');
            var centerControl = new CenterControl(centerControlDiv, this.map, location);

            centerControlDiv.index = 1;
            this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
            this._displayMarker("first", location);
            this._displayMarker("others", location);
        });
    },

    /**
     * GPS가 켜져 있을 경우 현재 위치를 가져옴
     * 
     * @param {Object}} map 구글 맵 
     */
    _getPosition() {
        return new Promise((resolve, reject) => {
            let infoWindow = new google.maps.InfoWindow({
                content: "현재 위치",
            });

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.position = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    infoWindow.setPosition(this.position);
                    this.map.setCenter(this.position);

                    let latLng = new google.maps.LatLng(this.position.lat, this.position.lng);
                    let marker = new google.maps.Marker({
                        position: latLng, //여기에 위도 경도 정보를 입력하고 마커 생성
                        map: this.map,
                    });

                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                    marker.setZIndex(99);
                    marker.addListener('click', () => {
                        infoWindow.open(this.map, marker);
                    });

                    resolve(this.position);
                }, () => {
                    reject("fail");
                    this._handleLocationError(true, infoWindow, search.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                reject("fail");
                this._handleLocationError(false, infoWindow, search.getCenter());
            }
        })

    },

    /**
     * 대피소 위치에 마커 표시
     * 
     * @param {String} path url path 
     * @param {Object} location 경도와 위도가 담긴 객체 
     */
    _displayMarker(path, location) {
        fetch("http://localhost:8080/shelter/Marker/"
            + path + "?latitude=" + location.lat + "&longitude=" + location.lng)
            .then((receive) => receive.json()
                .then((results) => {
                    console.log(results);
                    if (results.datas === undefined || results.datas === null) {
                        return;
                    }
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
                            map: this.map,
                            id: results.datas[i].id
                        });

                        marker.addListener('click', function () {
                            infowindow.open(this.map, marker);
                        });
                    }
                })
            )

    },

    /**
     * 현재 위치를 가져오는데 실패했을 경우 예외 처리
     * 
     * @param {Boolean} browserHasGeolocation GPS 사용 가능 여부 
     * @param {Object} infoWindow 정보가 들어있는 창 
     * @param {Object} pos 위도, 경도가 들어있는 위치 정보
     */
    _handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(this.map);
    }
}

/**
* The CenterControl adds a control to the map that recenters the map on
* Chicago.
* This constructor takes the control DIV as an argument.
* @constructor
*/
function CenterControl(controlDiv, map, location) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.borderRadius = '2px';
    controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '5px';
    controlUI.style.marginRight = '10px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlDiv.appendChild(controlUI);
    
    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.classList.add = "current_location";
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '25px';
    controlText.style.lineHeight = '38px';
    controlText.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
    controlText.color = "green";
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function () {
        console.log(location);
        map.setCenter(location);
    });

}