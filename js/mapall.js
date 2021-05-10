var mymap = L.map('mapid').setView([32.049357, 34.758355], 15); // change zoom and center   

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamFmZmFtb25hbW91ciIsImEiOiJja29laTQ4YzMwNW5jMnZsejZkMWNxMW1nIn0.FZF-e-4X_LuaFTbc199few'
}).addTo(mymap);

var marker = L.marker([32.049357, 34.758355]).addTo(mymap);

/* when images are filterd - modify JSON file to visible / invisible */

$('.img_filters').on('click', '.slider', function() {
    // empty string to push to
    var string_combined_arr = []
        // for every picture (both visible and invisible?)
    $(".building_square").each(function(index) {
        //console.log(index + ": " + $(this).text());
        var obj = new Object();
        obj.type = "Feature";
        // dict prop.
        var properties = {};
        let id = $(this).attr('id');
        //alert(id);
        properties.name = id; // $(this).attr('id')
        if ($(this).css('display') == 'none') {
            properties.show_on_map = 'false';
        } else {
            properties.show_on_map = 'true';
        };
        obj.properties = properties;
        // dict geo.
        var geometry = {};
        geometry.type = "Point";
        geometry.coordinates = "4";
        obj.geometry = geometry;
        // push to combined string
        string_combined_arr.push(obj);
        //string_combined += tmp_string;
        //convert object to json string
        var tmp_string = JSON.stringify(obj);
        console.log(JSON.parse(tmp_string)); // this is your requirement.
    });
    var string_combined_str = JSON.stringify(string_combined_arr); // turn from array to JSON formatted string
    //console.log(JSON.parse(string_combined_str)); // See results
});


var someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Busch Field",
        "show_on_map": false
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.98404, 39.74621]
    }
}];

/*
L.geoJSON(someFeatures, {
    filter: function(feature, layer) {
        return feature.properties.show_on_map;
    }
}).addTo(map);

*/