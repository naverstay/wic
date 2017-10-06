var all_pins = [],
  all_tooltips = [],
  mapProp = {
    zoom: 15,
    // disableDefaultUI: true,
    scrollwheel: false,
    // navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    styles: [
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#d3d3d3"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "color": "#808080"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#b3b3b3"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#ffffff"
          },
          {
            "weight": 1.8
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#d7d7d7"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#ebebeb"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#a7a7a7"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#efefef"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#696969"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "visibility": "on"
          },
          {
            "color": "#737373"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#d6d6d6"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {},
      {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      }
    ]
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
    }, 'i/wic_map.svg', 'i/wic_map_red.svg');

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

function createPin(target_map, name, latlng, icon, icon_hover, magic_top_offset) {
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

      if (icon_hover && icon_hover.length) {
        google.maps.event.addListener(marker, 'mouseover', function () {
          marker.setIcon(icon_hover);
        });
        google.maps.event.addListener(marker, 'mouseout', function () {
          marker.setIcon(icon);
        });
      }

      return marker;
    });

    img.src = icon;

  } else {
    marker = new google.maps.Marker({
      position: latlng,
      map: target_map,
      title: name
    });

    if (icon_hover && icon_hover.length) {
      google.maps.event.addListener(marker, 'mouseover', function () {
        marker.setIcon(icon_hover);
      });
      google.maps.event.addListener(marker, 'mouseout', function () {
        marker.setIcon(icon);
      });
    }

    return marker;
  }
}

$(function ($) {
  var availableTags = [
    "Абакан",
    "Азов",
    "Александров",
    "Алексин",
    "Альметьевск",
    "Анапа",
    "Ангарск",
    "Абакан",
    "Азов",
    "Александров",
    "Алексин",
    "Альметьевск",
    "Анапа",
    "Ангарск",
    "Абакан",
    "Азов",
    "Александров",
    "Алексин",
    "Альметьевск",
    "Анапа",
    "Ангарск"
  ];

  $('.autocompleteMe').each(function (ind) {
    var inp = $(this);

    inp.autocomplete({
      source: availableTags,
      appendTo: inp.parent().find('.autocompleteHolder .mCSB_container')
    });

  });

  body_var.delegate('.officeCollapseBtn', 'click', function () {
    $('.deliverySearchBlock').toggleClass('_collapsed');

    return false;
  });

  initScrollBars();

});
