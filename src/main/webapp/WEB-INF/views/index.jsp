<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<head>
	<title>Simple Map</title>
	<meta name="viewport" content="initial-scale=1.0">
	<meta charset="utf-8">
	<style>
		/* Always set the map height explicitly to define the size of the div
		   * element that contains the map. */
		#map {
			height: 100%;
		}

		/* Optional: Makes the sample page fill the window. */
		html,
		body {
			height: 100%;
			margin: 0;
			padding: 0;
		}
	</style>
</head>

<body>
	<div id="map"></div>
	<script>
		var map;
		function initMap() {
			map = new google.maps.Map(document.getElementById('map'), {
				center: { lat: 35.00989, lng: 128.825139 },
				zoom: 16
			});
		}
	</script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5EAI-XpCh6IL__6e-HL49CgXB2CW1dyg&callback=initMap"
		async defer></script>
</body>

</html>