let search = {
    autoComplete: null,
    
}

let autocomplete;
let url = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA5EAI-XpCh6IL__6e-HL49CgXB2CW1dyg&address=";
function requestLocation() {
    let address = document.getElementById("address").value;
    console.log(url + address);
    fetch(url + address)
        .then(res => (res.json()
            .then((result) => {
                map.setCenter(result.results[0].geometry.location);
            })))
}

let getLocation = () => {
    if (event.keyCode === 13) {
        let address = document.getElementById("address").value;
        console.log(url + address);
        fetch(url + address)
            .then(res => (res.json()
                .then((result) => {
                    map.setCenter(result.results[0].geometry.location);
                })))
    }
}

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete((document.getElementById('address')), { types: ['geocode'] });
}


