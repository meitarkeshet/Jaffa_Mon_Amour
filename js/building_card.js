// ----------- place items on page ----------- //

var img_top_loc = $(".carousel").offset().top;
var img_buttom_loc = img_top_loc + $(".carousel").height(); // $(window).height() - img_top_loc; //  - 

$(".summary").css("top", `${img_top_loc}px`);
$(".carousel-button").css("top", `${img_buttom_loc}px`);

var navigate_next_loc_top = $(".navigate_next").offset().top;
let elem = document.querySelector(".navigate_next");
let rect = elem.getBoundingClientRect();

$("#navigate_before").css("top", `${navigate_next_loc_top}px`);
$("#navigate_before").css("left", `${rect['left'] - rect['width']}px`);

// ----------- image carousel ----------- //
$('img').click(function(e) {
    // is there more then one image available for this building?
    var numImgs = $('img').length;
    // if Yes: continue
    if (numImgs > 1) {
        console.log('Multiple photos');
        console.log(`There are ${numImgs} images found.`);
        // slide + hide current shown picture
        let screen_width = document.body.clientWidth; // NOTICE - negetive value?
        $(this).animate({ "left": `${-screen_width}px`, 'opacity': '1' }, "slow", function() { // once the first img moved
            $(this).hide(); // turn invisible
            var photo_num = Number($(this).attr("photo_num")); // NOTICE - parsing to number
            console.log(`This is image number: ${photo_num}`);
            var next_photo_num = 1;
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

            //next_image.animate({ right: $(window).width() / 2 * (-1) }, 'slow');
        });

        // preset location out of screen
        //dist_screen_limit = rect['left'] - screen_width;
        //console.log(dist_screen_limit);
    } // Close: if (numImgs > 1)
    // if No: do nothing.
});

// ----------- Fade out hide / show ----------- //
$(document).ready(function() {
    $('.detailed-page').hide();
    console.log('hiding detailed');
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