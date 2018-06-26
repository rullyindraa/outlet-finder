function initMap() {
  var location = !{data};
  console.log(location);
  var map = new google.maps.Map(document.getElementById('map'), {
  center: {
    lat: 0.0,
    lng: 0.0
  },
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var infoWindow = new google.maps.InfoWindow({
    map: map
  });

  var marker, i;
  var icon = {
    url: "http://www.clker.com/cliparts/U/Q/d/9/V/E/orange-pin-md.png", // url
    scaledSize: new google.maps.Size(35, 58), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };

  for (i = 0; i < locations.length; i++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map,
      icon: icon,
      url: locations[i][4],
      title: 'Outlet : '+locations[i][0],
    });

    google.maps.event.addListener(marker, 'click', (function (marker, i) {
      return function () {
        infoWindow.setContent(locations[i][0]);
        window.location.href = this.url;
      }
    })(marker, i));
  }

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
  'Error: The Geolocation service failed.' :
  'Error: Your browser doesnt support geolocation.');
}
