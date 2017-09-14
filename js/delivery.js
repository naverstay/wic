var all_pins = [],
  all_tooltips = [],
  mapProp = {
    zoom: 15,
    // disableDefaultUI: true,
    scrollwheel: false,
    // navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    styles: [{
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{"color": "#193341"}]
    }, {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [{"color": "#2c5a71"}]
    }, {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [{"color": "#29768a"}, {"lightness": -37}]
    }, {"featureType": "poi", "elementType": "geometry", "stylers": [{"color": "#406d80"}]}, {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [{"color": "#406d80"}]
    }, {
      "elementType": "labels.text.stroke",
      "stylers": [{"visibility": "on"}, {"color": "#3e606f"}, {"weight": 2}, {"gamma": 0.84}]
    }, {"elementType": "labels.text.fill", "stylers": [{"color": "#ffffff"}]}, {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{"weight": 0.6}, {"color": "#1a3541"}]
    }, {"elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{"color": "#2c5a71"}]
    }]
  },
  gmap;

function loadMap() {

  // без таймаута не работает :(

  setTimeout(function () {
    var center = new google.maps.LatLng(55.807815, 37.597149);
    //var styledMapType = new google.maps.StyledMapType(map_styles);

    gmap = new google.maps.Map(document.getElementById("wic_map"), mapProp);
    gmap.setCenter(center);

    google.maps.event.addDomListener(window, 'resize', function () {
      gmap.setCenter(center);
    });


    createPin(gmap, 'WIC', {
      lat: 55.807815,
      lng: 37.597149
    }, 'i/wic_map.svg')

  }, 0);

}

function createMarker(target_map, name, latlng, marker_content, marker) {

  if (!marker) {
    marker = new google.maps.Marker({
      position: latlng,
      map: target_map,
      title: name
    });
  }

  marker.info = new google.maps.InfoWindow({
    pixelOffset: new google.maps.Size(0, 20),
    zIndex: null,
    boxStyle: {
      background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
      width: "120px"
    },

    // closeBoxURL: "", //THE CHANGE
    content: marker_content // '<IMG BORDER="0" ALIGN="Left" SRC="stagleton.jpg"> "My name is "' + name
  });

  google.maps.event.addListener(marker, 'click', function () {
    marker.info.open(target_map, marker);
  });

  return marker;
}

function createPin(target_map, name, latlng, icon, magic_top_offset) {
  var img = new Image(), marker;

  if (icon && icon.length) {
    $(img).one('load', function () {
      var image = new google.maps.MarkerImage(
        icon,
        new google.maps.Size(img.width, img.height),
        new google.maps.Point(0, 0),
        new google.maps.Point((img.width / 2).toFixed(), img.height + (magic_top_offset || 0))
      );

      marker = new google.maps.Marker({
        position: latlng,
        map: target_map,
        icon: image,
        title: name
      });

      return marker;
    });

    img.src = icon;

  } else {
    marker = new google.maps.Marker({
      position: latlng,
      map: target_map,
      title: name
    });

    return marker;
  }
}

$(function ($) {

  body_var.delegate('.officeCollapseBtn', 'click', function () {
    $('.deliverySearchBlock').toggleClass('_collapsed');

    return false;
  });

  initScrollBars();

});
