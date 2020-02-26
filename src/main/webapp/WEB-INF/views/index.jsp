<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>

<head>
	<title>Simple Map</title>
	<meta name="viewport" content="initial-scale=1.0">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" />
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
	<link rel="stylesheet" href="css/style.css?ver=1">
	<meta charset="utf-8">
</head>

<body>
	<div class="container">
		<div class="input-group mb-4 mt-4">
			<input id="keyword" name="input_keyword2" class="form-control" type="search" placeholder="주제어를 입력하세요.">
			<span class="input-group-append">
				<button id="submit_button" class="btn" type="button">
					<i class="fa fa-search"></i>
				</button>
			</span>
		</div>
	</div>
	<div id="map"></div>

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA5EAI-XpCh6IL__6e-HL49CgXB2CW1dyg&callback=initMap"
		async defer></script>
	<script src="https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyA5EAI-XpCh6IL__6e-HL49CgXB2CW1dygY" async defer></script>
	<!-- Resources -->
	<script src="https://code.jquery.com/jquery-Latest.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
		integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
		crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"></script>
	<script src="js/map.js"></script>`
</body>

</html>