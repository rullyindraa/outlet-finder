function initMap() {
  var lat = document.getElementById('lat').value;
  var lng = document.getElementById('lng').value;
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {
    lat : parseFloat( lat ),
    lng : parseFloat( lng )}
  });

  var marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position : {
    lat : parseFloat( lat ),
    lng : parseFloat( lng )}
  });
  marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
$(document).ready(function() {
  $("#calculate-route").submit(function(event) {
    event.preventDefault();
    calculateRoute($("#from").val(), $("#to").val());
  });
});

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    window.alert("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    "location": new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
  },
  function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var addr = results[0].formatted_address;
      $("#from").val(addr);
    } else {
      window.alert("Unable to retrieve your address.");
      // $("#error").append("Unable to retrieve your address<br />");
    }
  });
}

function calculateRoute(from, to) {
  var myOptions = {
    zoom: 10,
    center: {
      lat : parseFloat( lat ),
      lng : parseFloat( lng )},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);

  var directionsService = new google.maps.DirectionsService();
  var directionsRequest = {
    origin: from,
    destination: to,
    travelMode: google.maps.DirectionsTravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC
  };
  directionsService.route(
    directionsRequest,
    function(response, status)
    {
      if (status == google.maps.DirectionsStatus.OK) {
        new google.maps.DirectionsRenderer({
          map: mapObject,
          directions: response
        });
      } else {
        window.alert("Unable to retrieve your route.");
        //$("#error").append("Unable to retrieve your route<br />");
      }
    }
  );
}