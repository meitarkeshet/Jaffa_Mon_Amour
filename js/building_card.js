// ----------- place items on page ----------- //

$(document).ready(function() {

    var img_top_loc = $(".carousel").offset().top;
    var img_buttom_loc = img_top_loc + $(".carousel").height(); // $(window).height() - img_top_loc; //  - 

    $(".summary").css("top", `${img_top_loc}px`);
    $(".carousel-button").css("top", `${img_buttom_loc}px`);

    var navigate_next_loc_top = $(".navigate_next").offset().top;
    let elem = document.querySelector(".navigate_next");
    let rect = elem.getBoundingClientRect();

    $("#navigate_before").css("top", `${navigate_next_loc_top}px`);
    $("#navigate_before").css("left", `${rect['left'] - rect['width']}px`);

});

// ----------- image carousel ----------- //
// When clicking an image:
$('img').click(function(e) {
    // is there more then one image available for this building?
    var numImgs = $('img').length;
    // if Yes: continue
    if (numImgs > 1) {
        var next_photo_num = 1;
        //console.log('Multiple photos');
        //console.log(`There are ${numImgs} images found.`);
        // slide + hide current shown picture
        let screen_width = document.body.clientWidth; // NOTICE - negetive value?
        $(this).animate({ "left": `${-screen_width}px`, 'opacity': '1' }, "slow", function() { // once the first img moved
            $(this).hide(); // turn invisible
            var photo_num = Number($(this).attr("photo_num")); // NOTICE - parsing to number
            //console.log(`This is image number: ${photo_num}`);
            // next_photo_num = 1;
            if (photo_num != numImgs) { // if this isn't the last photo
                next_photo_num = String(photo_num + 1);
                console.log('The next image will be number: ', next_photo_num);
            };
            // select next image
            var next_image = $(`[photo_num=${next_photo_num}]`);
            // place out side of frame to the right
            //next_image.css({ left: screen_width }); // move aside;

            next_image.show(); // make visible
            next_image.css({ left: screen_width + next_image.width() }); // move out of window
            next_image.animate({
                    "left": `${screen_width - next_image.width()}px`
                },
                "slow"
            );

            // change radio buttons
            // find current radio button 'radio_button_checked' and change to 'radio_button_unchecked'
            var before_radio_sel = $("span:contains('radio_button_checked')");
            before_radio_sel.text("radio_button_unchecked");
            // find radio button that should be changed to 'radio_button_checked' and do it
            // NOTICE - indeces for 'eq' are zero based
            var after_radio_sel = $("span").eq(next_photo_num);
            after_radio_sel.text("radio_button_checked");
        }); // close $(this).animate({ "left": `${-screen_width}px`, 'opacity': '1' }, "slow", function() 
    }; // Close: if (numImgs > 1)
    // if No: do nothing.
});

// When clicking a radio button

$("div.carousel-button span").click(function() { // NOTICE - clicking a 'radio_button_checked' does nothing
    // $("div.carousel-button span:contains('radio_button_unchecked')")
    // NOTICE - moving images and then clicking creates error

    // change radio buttons
    // find current radio button 'radio_button_checked' and change to 'radio_button_unchecked'
    var before_radio_sel = $("div.carousel-button span:contains('radio_button_checked')"); //.carousel-button > 
    //console.log(before_radio_sel.text().trim());
    before_radio_sel.text("radio_button_unchecked");
    //console.log(before_radio_sel.text().trim());
    // Turn the radio button that was clicked to 'radio_button_checked'
    $(this).text("radio_button_checked");
    // change image to now 'radio_button_checked'
    var button_num = $(this).attr("button_num");
    // select the photo that corrisponds to the radio button clicked
    selected_img = $(`[photo_num=${button_num}]`);
    // if this is not the image currently showing - NOTICE safety mesaure if code breaks
    var shown_img = $('img').filter(function(index) { return ($(this).is(":visible")) }); //
    //console.log(shown_img);
    if (selected_img == shown_img) {
        //console.log('Button and image selection are same. Do nothing.');
    } else {
        //console.log('Changing images.');
        var next_photo_num = 1;
        // slide + hide current shown picture
        let screen_width = document.body.clientWidth; // NOTICE - negetive value?
        shown_img.animate({ "left": `${-screen_width}px`, 'opacity': '1' }, "slow", function() { // once the first img moved
            shown_img.hide(); // turn invisible
            selected_img.show(); // make visible
            selected_img.css({ left: screen_width + selected_img.width() }); // move out of window
            selected_img.animate({
                    "left": `${screen_width - selected_img.width()}px`
                },
                "slow"
            );

        }); // close $(this).animate({ "left": `${-screen_width}px`, 'opacity': '1' }, "slow", function() 


    }



});


// ----------- Fade out hide / show ----------- //
$(document).ready(function() {
    $('.detailed-page').hide();
    //console.log('hiding detailed');
    $("div img").hide(); // hide all images
    $("div img:first-child").show(); // show only the first one
});

$('.info-button').click(function(e) {
    var parent_div_class = $(this).parent().closest('div').eq(0).attr('class'); //.split(' '); // this gets the parent classes.
    console.log(parent_div_class);
    e.preventDefault()

    if (parent_div_class == 'summary-page') {
        console.log('moving to detailed');
        $(".info-summary").hide();
        $(".info-detailed").show();

        $('.summary-page').fadeOut(600, function() {
            $('.detailed-page').fadeIn(600);
        });
    } else if (parent_div_class == 'detailed-page') {
        console.log('moving to summary');
        $(".info-detailed").hide();
        $(".info-summary").show();
        $(".detailed-page").fadeOut(600, function() {
            $('.summary-page').fadeIn(600);
        });
    };
});

// ----------- data table ----------- //

// using data collected from output.html transmitted through app.js


$(document).ready(function() {
    $('.info-button').click(function(e) {
        var data = localStorage.getArray('passed_grid_elems')[0];
        $('#table_id').DataTable({
            "processing": true,
            retrieve: true,
            //paging: false,
            data: data,
            columns: [
                { 'data': 'id' },
                { 'data': "primary" },
                { 'data': "secondary" },
                { 'data': " building's street-facing front Distance from parcel limits (0 line) in meters" },
                //{ 'data': 'Amount of walkalbe Religious buildings (15 min.)' },
                //{ 'data': 'Amount of walkable street workout equipment (15 min.)' },
                { 'data': 'Amount of gas stations in 1k radius' },
                // { 'data': 'Amount of walkable hospitals and clinics 15. m radius' },
                { 'data': "Building's height (simple)" },
                { 'data': "Building's volume in cubic meter" },
                { 'data': 'Built density (2d built area / void) in 250 meter radius' },
                //{ 'data': 'Centrality (gravity) score for each building within 15 min. walk r.' },
                { 'data': 'Distance from the Sea in meteres' },
                //{ 'data': 'Distance from the Sea in meteres' },
                //{ 'data': 'Distance from the Sea in meteres' },
                //{ 'data': 'Distance from the Sea in meteres' },
                { 'data': 'Distance to nearest bicycle route in meters' },
                //{ 'data': 'Geo point via Flicker ' },
                // { 'data': 'Historical buildings within 15 min. walk' },
                //{ 'data': 'n_auto_tel' },
                //{ 'data': 'n_kindergartens' },
                //{ 'data': 'n_parks' },
                //{ 'data': 'n_playgrounds' },
                //{ 'data': 'n_tel_o_fun' },
                //{ 'data': 'Parcel size (square meters)' },
                //{ 'data': 'n_playgrounds' },
                //{ 'data': 'n_bicycle_parking' }, // 
                //{ 'data': 'tsunami_flood_line' },
                //{ 'data': 'long' },
                //{ 'data': 'lat' },

            ]

        });
        // console.log('building card log: ', localStorage.getArray('passed_grid_elems'));
        //console.log('building card log inside: ', data[0]);

    });
});

Storage.prototype.getArray = function(arrayName) {
    var thisArray = [];
    var fetchArrayObject = this.getItem(arrayName);
    if (typeof fetchArrayObject !== 'undefined') {
        if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
    }
    return thisArray;
}

// ----------- graphs ----------- //

var sel_data = []; // create empty
var single_building_data = [];
var all_avg_data = []; // create empty
// create empty lists to hold normalized values - once for single building and once for all buildings
var normalized_all_buildings = [];
var normalized_single_building = [];


// isolate the selected building and the rest 
$(document).ready(function() {
    $('.info-button').click(function(e) {
        var all_data = localStorage.getArray('passed_grid_elems')[0];
        var building_id = $('#building_id').text().split(' ')[1]; // NOTICE - using space as splitter

        /*
        var all_sun_radiation = all_building_height = all_historical_buildings = all_centrality = all_density =
            all_parcel_size = all_zero_line = []; // create empty arrays to hold all filterd buildings values by catagoreis
*/

        var all_sun_radiation = [];
        all_building_height = [];
        all_historical_buildings = [];
        all_centrality = [];
        all_density = [];
        all_parcel_size = [];
        all_zero_line = [];

        $.each(all_data, function(key, value) {
            all_sun_radiation.push(1); //  NOTICE change once there's more data - also lower in script + pushing 1 to avoid dividing 0/0 when normalizing
            all_building_height.push(Number(value["Building's height (simple)"]));
            all_historical_buildings.push(Number(value["Historical buildings within 15 min. walk"]));
            all_centrality.push(Number(value["Centrality (gravity) score for each building within 15 min. walk r."]));
            all_density.push(Number(value["Built density (2d built area / void) in 250 meter radius"]));
            all_parcel_size.push(Number(value["Parcel size (square meters)"]));
            all_zero_line.push(Number(value[" building's street-facing front Distance from parcel limits (0 line) in meters"]));

            // find current selected building matching to the page
            if (value.id == building_id) {
                sel_data = value;
            };
        });

        // return avrages for entire filtered values 

        function getAvg(arr) {
            const total = arr.reduce((acc, c) => acc + c, 0);
            return total / arr.length;
        };

        var avg_sun_radiation = getAvg(all_sun_radiation);
        var avg_building_height = getAvg(all_building_height);
        var avg_historical_buildings = getAvg(all_historical_buildings);
        var avg_centrality = getAvg(all_centrality);
        var avg_density = getAvg(all_density);
        var avg_parcel_size = getAvg(all_parcel_size);
        var avg_zero_line = getAvg(all_zero_line);

        all_avg_data = [avg_sun_radiation, avg_building_height, avg_historical_buildings,
            avg_centrality, avg_density, avg_parcel_size, avg_zero_line
        ];


        // array order: 'sun radiation',V'height',V'historical buildings around',V'centrality',V'built density',V'parcel size','distance from 0 line'
        var single_sun_radiation = 2; // NOTICE change once there's more data - also up in script pushing 2 to avoid dividing 0/0 when normalizing
        var single_building_height = Number(sel_data["Building's height (simple)"]);
        var single_historical_buildings = Number(sel_data["Historical buildings within 15 min. walk"]);
        var single_centrality = Number(sel_data["Centrality (gravity) score for each building within 15 min. walk r."]);
        var single_density = Number(sel_data["Built density (2d built area / void) in 250 meter radius"]);
        var single_parcel_size = Number(sel_data["Parcel size (square meters)"]);
        var single_zero_line = Number(sel_data[" building's street-facing front Distance from parcel limits (0 line) in meters"]);
        // create array holding data for selected building - for radar
        single_building_data = [single_sun_radiation, single_building_height, single_historical_buildings,
            single_centrality, single_density, single_parcel_size, single_zero_line
        ];

        // create a list holding the lists of values chacked - before avrage or any other math action
        var lst_radar_lst = [all_sun_radiation, all_building_height, all_historical_buildings,
            all_centrality, all_density, all_parcel_size, all_zero_line
        ];

        // function to Normelaize values between 0 and 1
        function normalizer(val, max, min) {
            return (val - min) / (max - min);
        };

        // for each list in list of lists: 1. find max, find min, pass matching single building value - to normalize 
        var i;
        for (i = 0; i < single_building_data.length; i++) { // run until matching number of catagories chacked for rader (currently 7)
            // normalizer(val, max, min)
            // normalize all (avraged) values
            normalized_all_buildings[i] = normalizer(all_avg_data[i], Math.max.apply(Math, lst_radar_lst[i]), Math.min.apply(Math, lst_radar_lst[i]));
            normalized_single_building[i] = normalizer(single_building_data[i], Math.max.apply(Math, lst_radar_lst[i]), Math.min.apply(Math, lst_radar_lst[i]));
        }
        normalized_all_buildings[0] = 0.2; // NOTICE change once there's more data - look up for the same phrase x2
        normalized_single_building[0] = 0.5; // NOTICE change once there's more data - look up for the same phrase x3

// ----------- simplex ----------- //

let _isMeimadOk = false; /* global flag that states if viewer is ready. */
/*an infinite loop or recursion that on each time frame (200 milliseconds) checks if the viewer is ready. The actual check is performed by
another method listent’s to viewer’s message event with appropriate ‘pong’ response. This is why we have a global flag */

function pingMeimad(){
window.frames.inlineFrameExample.contentWindow.postMessage("ping","*");
setTimeout(()=>{
if(!_isMeimadOk)
pingMeimad();
},200);
}

/*It is advised start checking internal embedded viewer only after the parent page is loaded or other logic that should performed before
anything else (this might be on another event/async method*/
window.addEventListener("load", function(event) {
        if (!_isMeimadOk) {
            setTimeout(pingMeimad, 200);
            return;
        }
    })
    /*Here we listen to the viewer’s ready response and we also initialize what events we would like to be notified about and even special
    data that would be returned by that event*/
window.addEventListener("message", function(event) {
    if (!_isMeimadOk) { /*This is the first time initialization saying to to parent window that negotiation started*/
        if (event.data == "pong") {
            _isMeimadOk = true;
            let data = {
                registerToEvents: [{
                        name: "screenSpaceEvent",
                        screenSpaceEventType: "LEFT_CLICK",
                        options: {
                            featureInfo: true /* return also feature properties */
                        },
                    },
                    {
                        name: "screenSpaceEvent",
                        screenSpaceEventType: "MOUSE_MOVE",
                        featureInfo: false
                    }
                ]
            }
            event.source.postMessage(data, "*");
        }
        Else
        return;
    } else if (event.data) {
        console.log(event.data.name);
        console.log(event.data.geoPosition);
        if (event.data.featureInfo) {
            console.log(event.data.featureInfo);
            /*in case featureInfo is true this object contains an array of key value objects related to clicked/moved over feature)*/
        }
    }
});
    }); // close     $('.info-button').click(function(e) {

});


// 1. radar

const data = {
    labels: [
        'sun radiation',
        'height',
        'historical buildings around',
        'centrality',
        'built density',
        'parcel size',
        'distance from 0 line'
    ],
    datasets: [{
        label: 'All buildings filtered (avg.)',
        data: normalized_all_buildings,
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
        label: 'Selected building',
        data: normalized_single_building,
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
    }]
};

const config = {
    type: 'radar',
    data: data,
    options: {
        elements: {
            line: {
                borderWidth: 3
            }
        }
    },
};

var radar_chart_elem = $('#radar_chart');
var radar_chart = new Chart(radar_chart_elem, config);

// ----------- close tab ----------- //

