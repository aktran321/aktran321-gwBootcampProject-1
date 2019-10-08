<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js">

var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://aerodatabox.p.rapidapi.com/flights/AA321/delays",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "aerodatabox.p.rapidapi.com",
		"x-rapidapi-key": "91517b45bamsh422e95c783d3857p157a15jsne3d2bb772529"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});
</script>