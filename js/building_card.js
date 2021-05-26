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
                //{ 'data': 'long' },
                //{ 'data': 'lat' },
                { 'data': "primary" },
                { 'data': 'n_bicycle_parking' }, // 

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

// isolate the selected building and the rest 
$(document).ready(function() {
    $('.info-button').click(function(e) {
        var all_data = localStorage.getArray('passed_grid_elems')[0];
        var building_id = $('#building_id').text().split(' ')[1]; // NOTICE - using space as splitter
        var sel_data = []; // create empty
        $.each(all_data, function(key, value) {
            if (value.id == building_id) {
                sel_data = value;
            };
        });
        console.log(sel_data);
    });
});

// 1. Radar - selected vs. total avg over sevral tests
// 2. multi-series pie
// 3.  Scatter?

// ------- General chart test -------- //

const data = {
    labels: [
        'Eating',
        'Drinking',
        'Sleeping',
        'Designing',
        'Coding',
        'Cycling',
        'Running'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
        label: 'My Second Dataset',
        data: [28, 48, 40, 19, 96, 27, 100],
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

console.log(radar_chart_elem);

/*

$(document).ready(function() {
    var ctx = document.getElementById('myChart');
    console.log(ctx);
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
*/