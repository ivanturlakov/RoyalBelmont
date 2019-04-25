var map;
var markers = [];

function initMap(){
	var customMapType = new google.maps.StyledMapType([
	    {
	        "featureType": "poi",
	        "elementType": "all",
	        "stylers": [
	            {
	                "saturation": -50
	            },
	            {
	                "lightness": 0
	            }
	        ]
	    },
	    {
	        "featureType": "administrative",
	        "elementType": "all",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 0
	            }
	        ]
	    },
	    {
	        "featureType": "road",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 0
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "hue": "#000000"
	            },
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": -100
	            },
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road.local",
	        "elementType": "all",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 100
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "water",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": -15
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "transit",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "hue": "#000000"
	            },
	            {
	                "saturation": 0
	            },
	            {
	                "lightness": -100
	            },
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "labels",
	        "stylers": [
	            {
	                "hue": "#000000"
	            },
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": -100
	            },
	            {
	                "visibility": "off"
	            }
	        ]
	    },
	    {
	        "featureType": "road",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "hue": "#bbbbbb"
	            },
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": 26
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "featureType": "landscape",
	        "elementType": "geometry",
	        "stylers": [
	            {
	                "hue": "#dddddd"
	            },
	            {
	                "saturation": -100
	            },
	            {
	                "lightness": -3
	            },
	            {
	                "visibility": "on"
	            }
	        ]
	    },
	    {
	        "elementType": "labels.text.stroke",
	        "stylers": [
	            {
	                "visibility": "on"
	            },
	            {
	                "color": "#ffffff"
	            },
	            {
	                "lightness": 16
	            }
	        ]
	    },
	    {
	        "elementType": "labels.text.fill",
	        "stylers": [
	            {
	                "saturation": 36
	            },
	            {
	                "color": "#222222"
	            },
	            {
	                "lightness": 40
	            }
	        ]
	    }
	]);
	
	var location = { lat: 42.398407, lng: -71.154178 };

	map = new google.maps.Map(document.getElementById('gmap'), {
        zoom: window.innerWidth > 767 ? 17 : 16,
        center: location,
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false
    });

    map.mapTypes.set("belmont_map", customMapType);
    map.setMapTypeId("belmont_map");


    // markers + info popup
    var markerImg = {
        url: 'img/map-marker.png',
        size: new google.maps.Size(74, 110),
        scaledSize: new google.maps.Size(74, 110),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(37, 110)
    };
    var belmontMarker = new google.maps.Marker({
        position: location,
        map: map,
        icon: markerImg,
        title: "Royal Belmot"
    });

    var infowindow = new google.maps.InfoWindow({
        content: "<div style='font-size:14px;line-height:20px'><b>Royal Belmont</b><br> address...<br> phone...<br> etc.<div>",
        pixelOffset: new google.maps.Size(0, 10)
    });
    belmontMarker.addListener('click', function() {
        infowindow.open(map, belmontMarker);
    });


    //show points
    if(typeof map_points != "undefined"){
	    showPoints();
	}

}

$(".legend a").click(function(){
	$(this).toggleClass("cb-checked");
	triggerMarkers( $(this).data("type"), $(this).hasClass("cb-checked") );
	return false;
})

function showPoints(type){
	for(var type in map_points){
		var point_group = map_points[type];
		for(var i = 0, t = point_group.length; i < t; i++){
			var point = point_group[i];
			console.log(point);

			var pointImg = {
		        url: "img/map-" + type + ".png",
		        size: new google.maps.Size(54, 54),
		        scaledSize: new google.maps.Size(54, 54),
		        origin: new google.maps.Point(0, 0),
		        anchor: new google.maps.Point(27, 27)
		    };
		    var pointMarker = new google.maps.Marker({
		        position: point,
		        //map: map,
		        icon: pointImg,
		        title: point.title,
		        type: type
		    });

		    markers.push(pointMarker);
		    showMarker(pointMarker);
		}
	}

	console.log(markers);
}

function showMarker(marker){
	marker.setMap(map);
}

function triggerMarkers(type, state){
	for(var i = 0, t = markers.length; i < t; i++){
		if(markers[i].type == type){
			if(state){
				markers[i].setMap(map);
			} else {
				markers[i].setMap(null);
			}
		}
	}
}



