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

var layerGroup = L.layerGroup().addTo(mymap);

var locations_layer;


// var marker = L.marker([32.049357, 34.758355]).addTo(mymap);


/* when images are filterd - modify JSON file to visible / invisible */

// $('.img_filters').on('click', '.slider', function() {
$(function() {
    var map_reload = function() {



        if (flag_groupby == true) {
            //console.log('Is grouped by');
        }; // is grouped by?

        // empty string to push to
        var string_combined_arr = []
            // for every picture (both visible and invisible?)
        $(".building_square").each(function() {
            //console.log(index + ": " + $(this).text().split('\n')[1]); // use to get specific line form text 
            var obj = new Object();
            obj.type = "Feature";
            // dict prop.
            var properties = {};
            // for Group-by
            if (flag_groupby == true) {
                let item_group = $(this).children(`.${sel_group_by}`);
                properties.item_group = item_group.text().trim(); // trim to protect from spacing issues
            }

            // Getting the ID of each item 
            var id = $(this).children('.id');
            id_lst_single = []; // empty list to push the collected object values
            $.each(id, function(index, value) {
                var numerify = Number(value.innerHTML);
                if (numerify) { // consider the possibility for getting a null if '?' is passed
                    id_lst_single.push(numerify);
                };
            });
            properties.id = id_lst_single[0];


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
            if (!($(this).hasClass('nullElem'))) { // consider null items that are added
                //console.log('Text passed:', $(this).text());
                //console.log('passed this:', $(this).text().split('\n')[2]);
                var lon = parseFloat($(this).text().split('\n')[2].trim()); // grab the long column (as string) and trim the excess spaces and parse to float
                var lat = parseFloat($(this).text().split('\n')[3].trim());
            } else {
                var lon = 0;
                var lat = 0;
            };

            let cord = [lon, lat]
            geometry.coordinates = cord; // format [-104.98404, 39.74621]
            obj.geometry = geometry;
            // push to combined string
            string_combined_arr.push(obj);
            //convert object to json string
            var tmp_string = JSON.stringify(obj);
            //console.log(JSON.parse(tmp_string)); // this is your requirement.
        }); // close $(".building_square").each(function(index)


        var str_open = '{ "type": "FeatureCollection",' +
            '"features": '; // notice no multiline option in JS
        var str_close = '}'
        var string_combined_str = JSON.stringify(string_combined_arr); // turn from array to JSON formatted string
        var together = str_open + string_combined_str + str_close;
        var json_pins = JSON.parse(together);

        mymap.invalidateSize() // fix gray areas issue after initializing with height 0

        /*
                // to download and see the json created
                var a = document.createElement("a")
                a.href = `data:application/json;charset=utf-8, ${together}`
                a.download = "some.json"
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
        */

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
            style: function(feature) {
                if (flag_groupby == true) { // if we are grouping by
                    var colorby_itemgroup = feature.properties.item_group;
                    // a. list of all colors + list all catagories.
                    var color_lst = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'];

                    // b. create dictionary with catagory and color
                    var keys = groupby_catlst.map(Function.prototype.call, String.prototype.trim); // trim to avoid spacing problems
                    //console.log(keys);
                    var values = color_lst.slice(0, keys.length); // cut the list to have the same num. members as keys
                    //console.log(values);
                    var dict = zip(keys, values); // create a dict with the catagory names and matching colors
                    console.log('color dict:', dict);
                    // c. use itemgroup as KEY to return color VALUE
                    return {
                        color: dict[colorby_itemgroup]
                    };
                } else if (flag_sortby == true) {
                    // what is the 'topic' by which we are sorting
                    var colorby_sort_cat = sorting_by;

                    // retrieve the values of only the currently shown locations - not all locations
                    var currently_shown_items = $grid.isotope('getFilteredItemElements')
                    all_sortable_val = $(currently_shown_items).children(`.${colorby_sort_cat}`);
                    all_sortable_val = [...all_sortable_val];

                    all_sortable_val_lst = []; // empty list to push the collected object values
                    $.each(all_sortable_val, function(index, value) {
                        var numerify = Number(value.innerHTML);
                        if (numerify) { // consider the possibility for getting a null if '?' is passed
                            all_sortable_val_lst.push(numerify);
                        };
                    });

                    // min and max values to compare with current value
                    let min_sortable = Math.min(...all_sortable_val_lst);
                    let max_sortable = Math.max(...all_sortable_val_lst);
                    var wanted_id = feature.properties.id; // the id of the item currently being inspected

                    // use the passed temporary item id to find it's matching sortable class value
                    // out of the shown items - grab the one if the id class that matches 'colorby_sort_id'
                    temp_sorted_item = $(currently_shown_items);
                    var current_sortable_value = -1; //create a place holder for the case of not finding the value
                    temp_sorted_lst = []; // empty list to push the collected object values
                    $.each(temp_sorted_item, function(index, value) {
                        //console.log(value);
                        temp_sorted_item_id = $(value).children('.id');
                        temp_sorted_item_id = [...temp_sorted_item_id]; // from object to list
                        temp_sorted_item_id = temp_sorted_item_id[0].innerHTML; // extract inner brackets value
                        if (temp_sorted_item_id == wanted_id) {
                            //console.log('BINGO!'); // if we have a match - we can use the sortable value of this item
                            current_sortable_value = $(value).children(`.${colorby_sort_cat}`); // look at the value of the specific item
                            current_sortable_value = [...current_sortable_value]; // from object to list
                            current_sortable_value = Number(current_sortable_value[0].innerHTML); // extract inner brackets value
                        };
                    });
                    var brightest_color = [198, 219, 239];
                    var darkest_color = [8, 48, 107];
                    // move to zero
                    min_sortable = 0;
                    max_sortable = max_sortable - min_sortable;
                    current_sortable_value = current_sortable_value - min_sortable;
                    // turn the max value into 100
                    if (max_sortable <= 100) {
                        multiply_val = 100 / max_sortable;
                        max_sortable *= multiply_val;
                        current_sortable_value *= multiply_val;
                    } else {
                        divider_val = max_sortable / 100;
                        max_sortable /= divider_val;
                        current_sortable_value /= divider_val;
                    };


                    //console.log(current_sortable_value);
                    //console.log(current_sortable_value / 100);
                    var point_on_range = current_sortable_value / 100;
                    //console.log(interpolateColor(brightest_color, darkest_color, point_on_range));
                    rgb_val = interpolateColor(brightest_color, darkest_color, point_on_range);
                    return {
                        color: rgbToHex(rgb_val[0], rgb_val[1], rgb_val[2])
                    };
                    // console.log(interpolateColors(brightest_color, darkest_color, steps));
                }
                // if its not grouped by:
                return {
                    color: '#1f78b4'
                };
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

        // Zoom to fit all markers map WIP 

        // var map is an instance of a Leaflet map
        // this function assumes you have added markers as GeoJSON to the map
        // it will return an array of all features currently shown in the
        // active bounding region.


        function getFeaturesInView() {
            var latlng_lst = [];
            var features = [];
            mymap.eachLayer(function(layer) {
                if (layer instanceof L.CircleMarker) {
                    if (mymap.getBounds().contains(layer.getLatLng())) {
                        latlng_lst.push(layer.getLatLng());
                        features.push(layer.feature);
                    };
                };
            });
            return latlng_lst;
            //return features;
        };
        mymap.setZoom(7); // zoom out to make sure to have all points in view before testing with getFeaturesInView()

        var in_view = getFeaturesInView();

        // Ensure there's at least one visible Marker
        if (in_view.length > 0) {
            //console.log(in_view);

            var min_lat, min_lon, max_lat, max_lon;
            min_lat = in_view[0].lat; // innit values using the first point in the array that's 'in_view_
            max_lat = in_view[0].lat;
            min_lon = in_view[0].lng;
            max_lon = in_view[0].lng;

            var upper_right_corner = [max_lat, max_lon]; // max lat, max lon
            var buttom_left_corner = [min_lat, min_lon]; // min lat, min lon
            //console.log('Innitial bounds: ', buttom_left_corner, upper_right_corner);
            var i;

            for (i = 1; i < in_view.length; i++) {
                var tmp_lat = in_view[i].lat;
                var tmp_lon = in_view[i].lng;
                // change LAT
                if (tmp_lat > max_lat) {
                    max_lat = tmp_lat;
                    upper_right_corner[0] = max_lat;
                };
                if (tmp_lat < min_lat) {
                    min_lat = tmp_lat;
                    buttom_left_corner[0] = min_lat;
                };
                // change LNG
                if (tmp_lon > max_lon) {
                    max_lon = tmp_lon;
                    upper_right_corner[1] = max_lon;
                };
                if (tmp_lon < min_lon) {
                    min_lon = tmp_lon;
                    buttom_left_corner[1] = min_lon;
                };
                //console.log('latlng_lst', latlng_lst[i].lat);
                //console.log('lng bounds', latlng_lst[i].lng);
            }
            //console.log('passing bounds: ', buttom_left_corner, upper_right_corner);
            var bounds = L.latLngBounds(upper_right_corner, buttom_left_corner);
            var bounds_center = bounds.getCenter();
            //console.log('bounds, center: ', bounds, bounds_center);
            //console.log(bounds_center.lat, bounds_center.lng);
            mymap.panTo(new L.LatLng(bounds_center.lat, bounds_center.lng)); // center
            mymap.fitBounds(bounds); // zoom in
        };


        //console.log(in_view.getBounds());
        //console.log('circle bounds: ', L.CircleMarker.getBounds());

        //console.log('layer bounds: ', locations_layer.getBounds());
        //mymap.fitBounds(locations_layer.getBounds().pad(0.5)); //works!

        //mymap.setView(locations_layer.getBounds().getCenter());
    };

    map_reload(); // run one on doc start;
    $(document).ready(function() { // run on every change in grid;
        $grid.on('arrangeComplete', // 
            function(event, filteredItems) {
                if (flag_refresh_groupby == false) {
                    console.log('Isotope arrange completed on ' +
                        filteredItems.length + ' items');
                    map_reload();
                };
            });
    });
});

// to create a dictionary from two lists
function zip(arr1, arr2, out = {}) {
    arr1.map((val, idx) => { out[val] = arr2[idx]; });
    return out;
}

// Returns a single rgb color interpolation between given rgb color
// based on the factor given;


function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) {
        factor = 0.5;
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
};

// My function to interpolate between two colors completely, returning an array
function interpolateColors(color1, color2, steps) {
    var stepFactor = 1 / (steps - 1),
        interpolatedColorArray = [];

    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    for (var i = 0; i < steps; i++) {
        interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
    }
    return interpolatedColorArray;
}

// turn rgb value to hex - NOTICE break the list
function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};



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

// ---------- Scroll to elements  ---------- //


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

// ---------- Group by alarm ---------- //

$('.layout-mode-button-group').on('click', 'button', function() {
    console.log('---------- Map >> Group by ----------');
});

// ---------- make map item larger on building hover ---------- //

// enlarge markers when hovering on image

$(function() {
    $(document).ready(function() {
        var enlarge_grid_item = ''; // placeholder
        var map_marker = ''; // empty var to replace
        $('.building_square').on("mouseover", function(event) {
            // on
            // detect matching item on map
            // avoid null items when 'grouped-by'
            if (!($(this).hasClass('nullElem'))) {
                // extrect item's lat / lon
                img_lat = $(this).children('p.lat')[0].innerHTML; // NOTICE [0]
                //console.log(img_lat);
                // find mathing map marker 
                var map_layers = locations_layer._layers;
                //console.log('map layers: ', map_layers);
                //console.log('val: ', map_layers[44]);
                //console.log('val latlng: ', map_layers[44]._latlng);
                //console.log('marker before: ', map_marker);
                // iterate over the map layers and return the map object that matches the img_lat
                for (const key in map_layers) {
                    checked_map_item = map_layers[key];
                    check_latlng = checked_map_item._latlng;
                    check_lat = check_latlng.lat;
                    if (check_lat == img_lat) { // is the markers lat matches the img lat - pass it on
                        map_marker = checked_map_item;
                    }
                }
                //console.log('marker after: ', map_marker);
                //console.log('marker radius before: ', map_marker._radius);
                map_marker._radius *= 1.5; // make the map marker larger
                //console.log('marker radius after: ', map_marker._radius);
                mymap.stop(); // reinnit the map by zooming in place
                mymap.invalidateSize();
            }

        }); // end of: .on("mouseover"
        $('.building_square').on("mouseout", function(event) {
            map_marker._radius /= 1.5; // make the map marker larger
            mymap.stop(); // reinnit the map by zooming in place
            mymap.invalidateSize();
        }); // end of: .on("mouseover"

    })
});

// enlarge images when hovering on marker

$(function() {
    var marker_enlarge_img = function() {
        $(document).ready(function() {
            var enlarge_grid_item = ''; // placeholder
            locations_layer.on("mouseover", function(event) {
                // find the lat-lng of the dot you being hoverd
                var clickedMarker = event.layer;
                var marker_geo = clickedMarker._latlng;
                // console.log(marker_geo.lat, marker_geo.lng);
                marker_geo_lat = marker_geo.lat;
                marker_geo_lng = marker_geo.lng;
                // find the matching building squere
                // retrieve the values of only the currently shown locations - not all locations

                var currently_shown_items = $grid.isotope('getFilteredItemElements');
                //console.log('before filter: ', currently_shown_items);
                var relevent_grid_item = currently_shown_items.filter(function(value, index) {
                    if ($(value).hasClass('nullElem')) {
                        return false;
                    } else {
                        item_lat_val = $(value).children('p.lat')[0].innerHTML; // NOTICE [0]
                        //console.log(item_lat_val);
                        return (item_lat_val == marker_geo_lat)
                    }

                });
                enlarge_grid_item = relevent_grid_item[0];
                //console.log(enlarge_grid_item);
                enlarge_grid_item.classList.add("enlarge_img");
            });
            locations_layer.on("mouseout", function(event) {
                enlarge_grid_item.classList.remove("enlarge_img");
            });
            locations_layer.on("click", function(event) { // to open building card page
                $(enlarge_grid_item).prev().children("a").click();
            });
        });
    };
    marker_enlarge_img(); // run one on doc start;
    $(document).ready(function() { // run on every change in grid;
        $grid.on('arrangeComplete', // 
            function(event, filteredItems) {
                marker_enlarge_img();
            });
    });
});