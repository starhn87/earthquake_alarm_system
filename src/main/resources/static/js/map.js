/**
 * DOM 로드 후 동작
 * 
 * @param  {String} "DOMContentLoaded" 돔 구성 완료
 */
document.addEventListener("DOMContentLoaded", () => {
    map._initMap();

    let searchButton = document.querySelector("#submit_button");
    searchButton.addEventListener("click", (event) => {
        search.changeCenter();
    });
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
            let centerControlDiv = document.createElement('div');
            let centerControl = this._CenterControl(centerControlDiv, this.map, location);

            centerControlDiv.index = 1;
            this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(centerControlDiv);
            this._displayMarker("first", location);
            this._displayMarker("others", location);
        });
    },

    /**
     * GPS가 켜져 있을 경우 현재 위치를 가져옴
     * 
     * @param {Object} map 구글 맵 
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
                    results.datas.forEach((data) => {
                        let contentString = this._makeContentString(data);
                        let latLng = new google.maps.LatLng(data.coordinates[0], data.coordinates[1]); //위도 경도 변수
                        let infowindow = new google.maps.InfoWindow({
                            content: contentString,
                            maxWidth: 300,
                        });

                        let marker = new google.maps.Marker({
                            position: latLng, //여기에 위도 경도 정보를 입력하고 마커 생성
                            map: this.map,
                            id: data.id
                        });
                        marker.setZIndex(5);

                        marker.addListener('click', function () {
                            infowindow.open(this.map, marker);
                        });
                    })
                })
            )
    },

    /**
     * 지진 대피소 데이터를 html화
     * 
     * @param {Object} data 지진 대피소 데이터
     * @return 가공된 지진 대피소 데이터
     */
    _makeContentString(data) {
        let contentString = "<h3>" + data.name + "</h3>";
        contentString += "<div><span style='color:white;background-color:orange;border:solid orange 1px;'>지번</span>" + data.jibun + "</div>"
        contentString += "<div><span style='color:white;background-color:red;border:solid red 1px;'>전화</span>" + data.phone + "</div>"
        contentString += "<div><B>최대수용인원: </B>" + data.capacity + "</div>";
        return contentString;
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
    },

    /**
    * 내 위치 버튼 생성자
    * @constructor
    */
    _CenterControl(controlDiv, map, location) {
        let controlUI = document.createElement('div');
        this._setControlUI(controlUI);
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        let controlText = document.createElement('div');
        this._setControlText(controlText);
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', () => {
            map.setCenter(location);
        });
    },

    /**
     * 내 위치 버튼 설정
     * 
     * @param {Element} controlUI 내 위치 버튼
     */
    _setControlUI(controlUI) {
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.borderRadius = '2px';
        controlUI.style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '5px';
        controlUI.style.marginRight = '10px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
    },

    /**
     * 현재 위치 컨텐츠 설정
     * 
     * @param {Element} controlText 현재 위치 컨텐츠
     */
    _setControlText(controlText) {
        controlText.classList.add = "current_location";
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '25px';
        controlText.style.lineHeight = '38px';
        controlText.innerHTML = '<i class="fas fa-map-marker-alt"></i>';
        controlText.color = "green";
    },
}

