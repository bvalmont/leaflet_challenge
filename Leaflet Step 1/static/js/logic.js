let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 6,
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: "pk.eyJ1IjoidmFsbW9udDM3NSIsImEiOiJjazE4OXZnMHowOHdmM25vOXI1NzJva3lvIn0.kqjs4SZox6IYe5d4c6N-uw"
}).addTo(myMap);

let usgs = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(usgs, function(data) {

     console.log(data);
     console.log(data.features);

     let features = data.features;

     console.log(features);

     for (var i = 0; i < features.length; i++) {
        let geo = features[i].geometry;
        let color = "";
        let magnitude = features[i].properties.mag;

        if (magnitude <=0) {
            color = "#9dff00"
        }

        else if (magnitude > 0 && magnitude <= 1){
            color = "#99ff00"
        }

        else if (magnitude > 1 && magnitude <= 2) {
	    	color = "#d0ff00";
	    }
	    else if (magnitude > 2 && magnitude <= 3) {
	    	color = "#ffe100";
	    }
	    else if (magnitude > 3 && magnitude <= 4) {
	    	color = "#ffaa00";
	    }
	    else if (magnitude > 4 && magnitude <= 5) {
	    	color = "#ff8400";
	    }
	    else if (magnitude > 5) {
	    	color = "#ff4800";
	    }


        L.circle([geo.coordinates[1], geo.coordinates[0]], {
		    fillOpacity: 0.8,
		    color: color,
		    fillColor: color,
		    // Adjust radius
		    radius: magnitude * 15000
		    }).bindPopup(features[i].properties.place + '<br></br>' + features[i].properties.mag + " on Richter scale").addTo(myMap);















     }
    




});