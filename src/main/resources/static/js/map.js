/**
 * DOM 로드 후 동작
 * 
 * @param  {String} "DOMContentLoaded" 돔 구성 완료
 */
document.addEventListener("DOMContentLoaded", () => {
    //let a = map.initMap();
})

function initMap() {
    let map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.050725, lng: 128.978905 },
        zoom: 16
    });

    fetch("http://localhost:8080/shelter/Marker/first?" + "latitude=" + "35.050725" + "&" + "longitude=" + "128.978905").then((receive) => {
        receive.json().then((results) => {
            console.log(results);
            if(results.datas==undefined||results.datas==null)
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
            if(results.datas==undefined||results.datas==null)
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
