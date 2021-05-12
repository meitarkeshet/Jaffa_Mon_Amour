//mymap.remove() // remove anything that exists before
var mymap = L.map('mapid').setView([32.049357, 34.758355], 15); // change zoom and center   

mymap.invalidateSize() // fix gray areas issue after initializing with height 0

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamFmZmFtb25hbW91ciIsImEiOiJja29laTQ4YzMwNW5jMnZsejZkMWNxMW1nIn0.FZF-e-4X_LuaFTbc199few'
}).addTo(mymap);


var locations_layer;


// var marker = L.marker([32.049357, 34.758355]).addTo(mymap);

var layerGroup = L.layerGroup().addTo(mymap);

/* when images are filterd - modify JSON file to visible / invisible */

// $('.img_filters').on('click', '.slider', function() {
$(function() {
    var map_reload = function() {
        //alert('yo');
        // empty string to push to
        var string_combined_arr = []
            // for every picture (both visible and invisible?)
        $(".building_square").each(function(index) {
            //console.log(index + ": " + $(this).text().split('\n')[1]); // use to get specific line form text 
            var obj = new Object();
            obj.type = "Feature";
            // dict prop.
            var properties = {};
            let id = $(this).attr('id');
            //alert(id);
            // address?
            properties.name = "id"; // $(this).attr('id')
            if ($(this).css('display') == 'none') { // if the image is not currently showing (was filterd by user, don't )
                properties.show_on_map = false;
            } else {
                properties.show_on_map = true;
            };


            obj.properties = properties;
            // add popupContent?
            // dict geo.
            var geometry = {};
            geometry.type = "Point";
            let lon = parseFloat($(this).text().split('\n')[2].trim()); // grab the long column (as string) and trim the excess spaces and parse to float
            let lat = parseFloat($(this).text().split('\n')[3].trim());
            let cord = [lon, lat]
            geometry.coordinates = cord; // format [-104.98404, 39.74621]
            obj.geometry = geometry;
            // push to combined string
            string_combined_arr.push(obj);
            //convert object to json string
            var tmp_string = JSON.stringify(obj);
            //console.log(JSON.parse(tmp_string)); // this is your requirement.
        });
        var str_open = '{ "type": "FeatureCollection",' +
            '"features": '; // notice no multiline option in JS
        var str_close = '}'
        var string_combined_str = JSON.stringify(string_combined_arr); // turn from array to JSON formatted string
        var together = str_open + string_combined_str + str_close;
        var json_pins = JSON.parse(together);

        mymap.invalidateSize() // fix gray areas issue after initializing with height 0


        // to download and see the json created
        var a = document.createElement("a")
        a.href = `data:application/json;charset=utf-8, ${together}`
        a.download = "some.json"
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)


        //alert(locations_layer);
        //$('#mapid').remove();


        if (layerGroup !== undefined) {
            // remove all the markers in one go
            layerGroup.clearLayers();
            mymap.removeLayer(layerGroup);
            // alert("trying to clean");
        };


        locations_layer = new L.geoJSON(json_pins, {
            filter: function(feature, layer) {
                return feature.properties.show_on_map;
            },
            pointToLayer: function(feature, latlng) {
                return new L.CircleMarker(latlng, {
                    radius: 10,
                    fillOpacity: 0.85
                });
            }
        });
        // Adding current locations to the layer group
        locations_layer.addTo(layerGroup);

        // Adding layer group to map
        layerGroup.addTo(mymap);
    };
    map_reload(); // run one on doc start;
    $(document).ready(function() { // run on every change in grid;
        $grid.on('arrangeComplete', // 
            function(event, filteredItems) {
                console.log('Isotope arrange completed on ' +
                    filteredItems.length + ' items');
                map_reload();
            });
    });
});





/*
geojsonLayer = L.geoJson(json_pins, {
    style: function(feature) {
        return {
            color: "green"
        };
    },
    pointToLayer: function(feature, latlng) {
        return new L.CircleMarker(latlng, {
            radius: 10,
            fillOpacity: 0.85
        });
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.name);
    }
});
*/
//mymap.addLayer(geojsonLayer);


// scroll to elements 

$('#vis_grid').click(function() {
    //$('#nav_sticky').addClass('fixedscroll'); // try open bar first
    $([document.documentElement, document.body]).animate({
        scrollTop: $('#gridid').offset().top - 100 // NOTICE - substract the bar pixels
    }, 2000);
});

// back to top

$('#vis_map').click(function() {
    $([document.documentElement, document.body]).animate({
        scrollTop: 0
    }, 2000);
});

// for keeping the menu fixed on scrol
// change to always locked
$(document).ready(function() {
    $(window).trigger('scroll');
    $(window).bind('scroll', function() {
        //alert('scroll'); // works
        var pixels = 100; //number of pixels before modifying styles - needs to work with bar size
        if ($('#About_me_main').is(':animated')) { // is this actually working?
            if ($(window).scrollTop() >= pixels) {
                $('#nav_sticky').addClass('fixedscroll');
                // $('#gridid').addClass('maringscroll');
            } else {
                $('#nav_sticky').removeClass('fixedscroll');
                //$('#gridid').removeClass('maringscroll');
            }
        }
    });
});

$("#foo").one("click", function() {
    alert("This will be displayed only once.");
});

// only first isotope innit for map
/*
$grid.one('arrangeComplete', function() {
    console.log('arrange done, just this one time');
});
*/