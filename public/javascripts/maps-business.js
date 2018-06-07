function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -7.7830011, lng: 110.3892038},
    zoom: 13
  });
  var input = document.getElementById('pac-input');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);
  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);
  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    
    for (var i = 0; i < place.address_components.length; i++) {
      for (var j = 0; j < place.address_components[i].types.length; j++) {
        if (place.address_components[i].types[j] == "postal_code") {
          document.getElementById('postal_code').value = place.address_components[i].long_name;
        } else if (place.address_components[i].types[j] == "country") {
          document.getElementById('country').value = place.address_components[i].short_name;
        } else if (place.address_components[i].types[j] == "administrative_area_level_1") {
          document.getElementById('adm1').value = place.address_components[i].short_name;
        } else if (place.address_components[i].types[j] == "administrative_area_level_2") {
          document.getElementById('adm2').value = place.address_components[i].short_name;
        } else if (place.address_components[i].types[j] == "administrative_area_level_3") {
          document.getElementById('adm3').value = place.address_components[i].short_name;
        } else if (place.address_components[i].types[j] == "administrative_area_level_4") {
          document.getElementById('adm4').value = place.address_components[i].short_name;
        } else if (place.address_components[i].types[j] == "administrative_area_level_5" || place.address_components[i].types[j] == "locality") {
          document.getElementById('line2').value = place.address_components[i].short_name;
        } else if (place.address_components[i].types[j] == "route") {
          var route = place.address_components[i].short_name;
        } else if (place.address_components[i].types[j] == "street_number") {
          var st = place.address_components[i].short_name;
        }
      }
    }
    var address = '';
    var component = place.address_components;
    var formatted_address = place.formatted_address;
    var lat1 = place.geometry.location.lat();
    var lng1 = place.geometry.location.lng();
    if (route === undefined) {
      route = '';
    }
    if (st === undefined) {
      st = '';
    }
    document.getElementById('line1').value = route + ' ' + st;
    document.getElementById("lat").value = lat1;
    document.getElementById("lng").value = lng1;
    document.getElementById("formatted_address").value = formatted_address;
    console.log(component);
    console.log(place);
    console.log(formatted_address);
    if (place.address_components) {
      address = [
      (place.address_components[0] && place.address_components[0].short_name || ''),
      (place.address_components[1] && place.address_components[1].short_name || ''),
      (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }
    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
  });

  var lat = document.getElementById('lat').value;
  var lng = document.getElementById('lng').value;
  
  var myLatLng = {lat: lat, lng: lng};

  var marker = new google.maps.Marker({
    map: map,
    draggable: true,
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
