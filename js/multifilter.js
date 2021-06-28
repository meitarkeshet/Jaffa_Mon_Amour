// This isn't necessary but it keeps the editor from thinking these external packages are typos or missing
// external js: isotope.pkgd.js masonry-horizontal.js cells-by-column.js
/* global isotope.pkgd.js, noUiSlider */
//-----------------------------------


// filter functions
var filterFns = {
    //binary_true
    tsunami_binary_true: function() {
        var bol = $(this).find('.tsunami_flood_line').text();
        //alert(bol.match(0))
        return bol.match(0);
    },
    tsunami_binary_false: function() {
        var bol = $(this).find('.tsunami_flood_line').text();
        return bol.match(1);
    },
    // show if name ends with -ium
    ium: function() {
        var name = $(this).find('.name').text();
        return name.match(/ium$/);
    },
    // id
    id_min_max_slider: function() {
        var id_num = $(this).find('.id').text();
        var slider_min = parseInt(id_slider.noUiSlider.get()[0]);
        var slider_max = parseInt(id_slider.noUiSlider.get()[1]);
        //console.log(slider_min);
        return (parseInt(id_num, 10) >= slider_min && parseInt(id_num, 10) <= slider_max);
    },

    // bi_parking_slider bi_parking_min_max_slider
    bi_parking_min_max_slider: function() {
        var bi_parking_num = $(this).find('.n_bicycle_parking').text();
        var slider_min = parseInt(bi_parking_slider.noUiSlider.get()[0]);
        //alert(slider_min)
        var slider_max = parseInt(bi_parking_slider.noUiSlider.get()[1]);
        //console.log(slider_min);
        return (parseInt(bi_parking_num, 10) >= slider_min && parseInt(bi_parking_num, 10) <= slider_max);

    },
    // n_tel_o_fun_min_max_slider
    n_tel_o_fun_min_max_slider: function() {
        var tel_o_fun_num = $(this).find('.n_tel_o_fun').text();
        var slider_min = parseInt(n_tel_o_fun_slider.noUiSlider.get()[0]);
        //alert(slider_min)
        var slider_max = parseInt(n_tel_o_fun_slider.noUiSlider.get()[1]);
        //console.log(slider_min);
        return (parseInt(tel_o_fun_num, 10) >= slider_min && parseInt(tel_o_fun_num, 10) <= slider_max);

    },
    // n_auto_tel_slider
    n_auto_tel_min_max_slider: function() {
        var n_auto_tel_num = $(this).find('.n_auto_tel').text();
        var slider_min = parseInt(n_auto_tel_slider.noUiSlider.get()[0]);
        //alert(slider_min)
        var slider_max = parseInt(n_auto_tel_slider.noUiSlider.get()[1]);
        //console.log(slider_min);
        return (parseInt(n_auto_tel_num, 10) >= slider_min && parseInt(n_auto_tel_num, 10) <= slider_max);

    },
    // n_parks_slider
    n_parks_min_max_slider: function() {
        var n_parks_num = $(this).find('.n_parks').text();
        var slider_min = parseInt(n_parks_slider.noUiSlider.get()[0]);
        //alert(slider_min)
        var slider_max = parseInt(n_parks_slider.noUiSlider.get()[1]);
        //console.log(slider_min);
        return (parseInt(n_parks_num, 10) >= slider_min && parseInt(n_parks_num, 10) <= slider_max);

    },
    // n_playgrounds_slider
    n_playgrounds_min_max_slider: function() {
        var n_playgrounds_num = $(this).find('.n_playgrounds').text();
        var slider_min = parseInt(n_playgrounds_slider.noUiSlider.get()[0]);
        //alert(slider_min)
        var slider_max = parseInt(n_playgrounds_slider.noUiSlider.get()[1]);
        //console.log(slider_min);
        return (parseInt(n_playgrounds_num, 10) >= slider_min && parseInt(n_playgrounds_num, 10) <= slider_max);

    },
    // arrnona_year
    arrnona_year: function() {
        var arrnona_year_num = $(this).find('.arrnona_year').text();
        var slider_min = parseInt(arrnona_year_slider.noUiSlider.get()[0]);
        //alert(slider_min)
        var slider_max = parseInt(arrnona_year_slider.noUiSlider.get()[1]);
        //console.log(slider_min);
        return (parseInt(arrnona_year_num, 10) >= slider_min && parseInt(arrnona_year_num, 10) <= slider_max);

    },
    // accesability_score
    accesability_score: function() {
        var accesability_score_num = $(this).find('.accesability_score_normalized').text();
        var slider_min = parseFloat(accesability_score_slider.noUiSlider.get()[0]);
        //alert(slider_min)
        var slider_max = parseFloat(accesability_score_slider.noUiSlider.get()[1]);
        //console.log(slider_min);
        return (parseFloat(accesability_score_num, 10) >= slider_min && parseFloat(accesability_score_num, 10) <= slider_max); // NOTICE - parseFloat for decimaals 
    },
    // amenities_score
    amenities_score: function() {
        var amenities_score_num = $(this).find('.amenities_score_normalized').text();
        var slider_min = parseFloat(amenities_score_slider.noUiSlider.get()[0]);
        //alert(slider_min)
        var slider_max = parseFloat(amenities_score_slider.noUiSlider.get()[1]);
        //console.log(slider_min);
        return (parseFloat(amenities_score_num, 10) >= slider_min && parseFloat(amenities_score_num, 10) <= slider_max); // NOTICE - parseFloat for decimaals
    },
    // tourism_score
    tourism_score: function() {
        var tourism_score_num = $(this).find('.amenities_score_normalized').text();
        var slider_min = parseFloat(tourism_score_slider.noUiSlider.get()[0]);
        //alert(slider_min)
        var slider_max = parseFloat(tourism_score_slider.noUiSlider.get()[1]);
        //console.log('tourism max: ', slider_min, 'tourism min: ', 'tourism max:', slider_max);
        //console.log('not parsed:', tourism_score_num);
        //console.log('pasred int 10:', parseInt(tourism_score_num, 10));
        //console.log('pasred float 10:', parseFloat(tourism_score_num, 10));

        return (parseFloat(tourism_score_num, 10) >= slider_min && parseFloat(tourism_score_num, 10) <= slider_max); // NOTICE - parseFloat for decimaals
    },
    // n_kindergartens_slider
    n_kindergartens_min_max_slider: function() {
        var n_kindergartens_num = $(this).find('.n_kindergartens').text();
        var slider_min = parseInt(n_kindergartens_slider.noUiSlider.get()[0]);
        //alert(slider_min)
        var slider_max = parseInt(n_kindergartens_slider.noUiSlider.get()[1]);
        //console.log(slider_min);
        return (parseInt(n_kindergartens_num, 10) >= slider_min && parseInt(n_kindergartens_num, 10) <= slider_max);
    }
};


// store filter for each group
var filters = {};

var colWidth = 5; // start colwidth with a random value to be changed later

// init Isotope
var $grid = $('.grid').isotope({
    itemSelector: '.building_square',
    layoutMode: 'fitRows', // NOTICE changed form 'fitRows' cellsByColumn  fitColumns
    cellsByColumn: {
        columnWidth: colWidth, //120
        //gutter: 150 //  not working
        rowHeight: 52
    },
    getSortData: {
        primary: '.primary',
        secondary: '.secondary',
        complex: '.complex',
        technology: '.technology',
        status: '.status',
        finishing_materials: '.finishing_materials',
        roof: '.roof',
        typology: '.typology',
        positioning: '.positioning',
        physical_condition: '.physical_condition',
        general_evaluation: '.general_evaluation',
        built_density: '.built_density',
        centrality: '.centrality',
        dist_parcel_limit: '.dist_parcel_limit',
        bld_vol: '.bld_vol',
        n_historical_bld: '.n_historical_bld',
        arrnona_year: '.arrnona_year',
        radiation: '.radiation',
        col_header: '[col_header]',
        id: '.id',
        n_bicycle_parking: '.n_bicycle_parking',
        n_parks: '.n_parks',
        category: '[data-category]',
        weight: function(itemElem) {
            var weight = $(itemElem).find('.weight').text();
            return parseFloat(weight.replace(/[\(\)]/g, ''));
        }
    },
    filter: function() {

        var isMatched = true;
        var $this = $(this);
        // skip filtering on null objects (that are used as spacers for Group-by)
        if (!($(this).hasClass('nullElem'))) {
            //console.log('Not a null object!');

            for (var prop in filters) {
                var filter = filters[prop];
                //console.log(filter); // slider names
                // use function if it matches
                filter = filterFns[filter] || filter;
                //console.log(filter); // functions if they exist
                // test each filter
                if (filter) {
                    isMatched = isMatched && $(this).is(filter);
                }
                // break if not matched
                if (!isMatched) {
                    break;
                }
            }
        }

        return isMatched;
    }
});

// --------- FOR BUTTONS ------------

// bind filter button click
$('.filters').on('click', 'button', function() {
    var $this = $(this);
    // get group key
    var $buttonGroup = $this.parents('.button-group');
    var filterGroup = $buttonGroup.attr('data-filter-group');
    // set filter for group
    filters[filterGroup] = $this.attr('data-filter');
    //alert($this.parents('.button-group'));
    // arrange, and use filter fn
    $grid.isotope();

});

// bind sort button click
$('#sorts').on('click', 'button', function() {
    // we can't sort and group-by at the same to
    // so first make sure we aren't grouped-by by clicking group-by 'original order'
    if (flag_groupby == true) { // if group-by mode is on
        if (!($("#group-sort > button:first").hasClass('is-checked'))) { // and it's on "regular" mode
            //alert('< --------- RESETTING groupby sort --------- >');
            $("#group-sort > button:first").click(); // return it to "regular"
        };
    };

    // now sort
    var sortByValue = $(this).attr('data-sort-by');
    $grid.isotope({ sortBy: sortByValue });
    if (sortByValue == 'original-order') {
        flag_regular = true; // turn regular flag on
        flag_groupby = false;
        flag_sortby = false;
    } else {
        flag_regular = false;
        flag_groupby = false;
        flag_sortby = true; // turn sortby flag on
    }
    sorting_by = sortByValue;

});



// change is-checked class on buttons
$('.button-group').each(function(i, buttonGroup) {
    //alert($(buttonGroup))
    // ADD DIFFERENCE BETWEEN 'any' Button and the rest 
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function() {
        //alert($buttonGroup.find('.is-checked'))
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});





// V -------------- Create Sliders -------------- V

// ID 
/*

var id_slider = document.getElementById('id_slider');

noUiSlider.create(id_slider, {

    start: [1698, 65938],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    range: { // change according to each slider's value
        'min': 1698,
        'max': 65938
    }
});
*/

// Merging overlapping tooltips - Dosn't work at the same time as showing tooltips only when using

// mergeTooltips(id_slider, 15, ' - ');

/*

// n_bicycle_parking: Amount of bicycle parkings within a 15 min. walk 
noUiSlider.create(bi_parking_slider, {

    start: [0, 42],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    range: { // change according to each slider's value
        'min': 0,
        'max': 42
    }
});

// n_tel_o_fun_slider
noUiSlider.create(n_tel_o_fun_slider, {

    start: [0, 399],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    range: { // change according to each slider's value
        'min': 0,
        'max': 399
    }
});

// n_auto_tel_slider
noUiSlider.create(n_auto_tel_slider, {

    start: [0, 76],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    range: { // change according to each slider's value
        'min': 0,
        'max': 76
    }
});

// n_parks_slider
noUiSlider.create(n_parks_slider, {

    start: [0, 249],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    range: { // change according to each slider's value
        'min': 0,
        'max': 249
    }
});

// n_playgrounds_slider
noUiSlider.create(n_playgrounds_slider, {

    start: [0, 40],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    range: { // change according to each slider's value
        'min': 0,
        'max': 40
    }
});

// n_kindergartens_slider
noUiSlider.create(n_kindergartens_slider, {

    start: [0, 49],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    range: { // change according to each slider's value
        'min': 0,
        'max': 49
    }
});
*/

noUiSlider.create(accesability_score_slider, {

    start: [0, 1],
    tooltips: [wNumb({ decimals: 1 }), wNumb({ decimals: 1 })],
    connect: true,
    range: { // change according to each slider's value
        'min': 0,
        'max': 1
    }
});

noUiSlider.create(amenities_score_slider, {

    start: [0, 1],
    tooltips: [wNumb({ decimals: 1 }), wNumb({ decimals: 1 })],
    connect: true,
    range: { // change according to each slider's value
        'min': 0,
        'max': 1
    }
});

noUiSlider.create(tourism_score_slider, {

    start: [0, 1],
    tooltips: [wNumb({ decimals: 1 }), wNumb({ decimals: 1 })],
    connect: true,
    range: { // change according to each slider's value
        'min': 0,
        'max': 1
    }
});

noUiSlider.create(arrnona_year_slider, {

    start: [1900, 2014],
    tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
    connect: true,
    range: { // change according to each slider's value
        'min': 1900,
        'max': 2014
    }
});
// --------- FOR SLIDERS ------------


$('.img_filters').on('click', '.slider', function() {
    // get group key
    filterGroup = $(this).attr('id')
        //console.log(filterGroup);
        //alert(filterGroup);
    var filterValue = $(this).attr('data-filter');
    //alert(filterValue);
    // use filterFn if matches value
    //filterValue = filterFns[filterValue] || filterValue;
    //alert(filterValue);
    // set filter for group
    filters[filterGroup] = filterValue;
    //alert(combo_filters);
    // combine filters ------- CODE BREAKS HERE ---------
    //var filters_concat = concatValues(combo_filters);
    //alert(filters_concat);
    // arrange, and use filter fn
    $grid.isotope(); // WIP
    /*
        $grid.isotope({
            filter: filters + ', .ignore'
        });
    */
});

// flatten object by concatting values - for combaining filter 
function concatValues(obj) {
    var value = '';
    for (var prop in obj) {
        value += obj[prop];
    }
    //alert(value)
    return value;
}

// change is-checked class on filter to change color UI (show when clicked)
$('.button-group').each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});


/* Merging overlapping tooltips */




/**
 * @param slider HtmlElement with an initialized slider
 * @param threshold Minimum proximity (in percentages) to merge tooltips
 * @param separator String joining tooltips
 */
function mergeTooltips(slider, threshold, separator) {

    var textIsRtl = getComputedStyle(slider).direction === 'rtl';
    var isRtl = slider.noUiSlider.options.direction === 'rtl';
    var isVertical = slider.noUiSlider.options.orientation === 'vertical';
    var tooltips = slider.noUiSlider.getTooltips();
    var origins = slider.noUiSlider.getOrigins();

    // Move tooltips into the origin element. The default stylesheet handles this.
    tooltips.forEach(function(tooltip, index) {
        if (tooltip) {
            origins[index].appendChild(tooltip);
        }
    });

    slider.noUiSlider.on('update', function(values, handle, unencoded, tap, positions) {

        var pools = [
            []
        ];
        var poolPositions = [
            []
        ];
        var poolValues = [
            []
        ];
        var atPool = 0;

        // Assign the first tooltip to the first pool, if the tooltip is configured
        if (tooltips[0]) {
            pools[0][0] = 0;
            poolPositions[0][0] = positions[0];
            poolValues[0][0] = values[0];
        }

        for (var i = 1; i < positions.length; i++) {
            if (!tooltips[i] || (positions[i] - positions[i - 1]) > threshold) {
                atPool++;
                pools[atPool] = [];
                poolValues[atPool] = [];
                poolPositions[atPool] = [];
            }

            if (tooltips[i]) {
                pools[atPool].push(i);
                poolValues[atPool].push(values[i]);
                poolPositions[atPool].push(positions[i]);
            }
        }

        pools.forEach(function(pool, poolIndex) {
            var handlesInPool = pool.length;

            for (var j = 0; j < handlesInPool; j++) {
                var handleNumber = pool[j];

                if (j === handlesInPool - 1) {
                    var offset = 0;

                    poolPositions[poolIndex].forEach(function(value) {
                        offset += 1000 - 10 * value;
                    });

                    var direction = isVertical ? 'bottom' : 'right';
                    var last = isRtl ? 0 : handlesInPool - 1;
                    var lastOffset = 1000 - 10 * poolPositions[poolIndex][last];
                    offset = (textIsRtl && !isVertical ? 100 : 0) + (offset / handlesInPool) - lastOffset;

                    // Center this tooltip over the affected handles
                    tooltips[handleNumber].innerHTML = poolValues[poolIndex].join(separator);
                    tooltips[handleNumber].style.display = 'block';
                    tooltips[handleNumber].style[direction] = offset + '%';
                } else {
                    // Hide this tooltip
                    tooltips[handleNumber].style.display = 'none';
                }
            }
        });
    });
};


// --------- For map colors ------------ //

// Flags to indicite 1. Group-by, 2. Sort, or 3. None

var flag_groupby = false;
var flag_sortby = false;
var flag_regular = true;

var sel_group_by = '';
var num_groups = 0;
var groupby_catlst = '';

// for sorting 
var sorting_by = '';

// to avoid reload in mapall
var flag_refresh_groupby = false;

// --------- Grouping ------------ //

// to enable multiple layouts

var isHorizontal = false;
var $window = $(window);

$(function() {
    var groupby_reinnit = function(layoutModeButtonGroup_button) {
        //console.log('this is "THIS": ', $(this));
        console.log('this is "passed": ', layoutModeButtonGroup_button);

        flag_groupby = false; // reset group by flag

        // ------------------ Null elem creation ------------------- //
        console.log('---------- Resetting layout ----------');
        // remove all previously added null items, if exist
        existing_nulls = document.getElementsByClassName('nullElem');
        console.log('existing null before: ', existing_nulls);
        $grid.isotope('remove', existing_nulls);
        //console.log('existing null after isotope: ', existing_nulls);
        $(existing_nulls).remove();
        console.log('existing null after jquery remove: ', existing_nulls);

        // layout remaining item elements
        $grid.isotope('layout'); // restart layout
        $grid.isotope('reloadItems'); // work?

        var null_flag = false;
        var user_sel_lst = []; // create an empty list to hold the values for all buildings depending on the user's groupby selection
        sel_group_by = layoutModeButtonGroup_button.attr('data-group-by'); // update global for mapall
        console.log('sel_group_by: ', sel_group_by);
        if (sel_group_by === undefined) { // NOTICE to work with filter
            console.log('passing undefined order');
            sel_group_by = 'non';
        };
        console.log("sel_group_by after verification:", sel_group_by);
        // collect the information from the currently shown pictures *NOTICE is is working after Filter?
        $(".building_square").each(function(index) {
            if (!($(this).hasClass('nullElem'))) { // if it's not a null added item
                // and only if it's currently shown
                if ($(this).css('display') != 'none') { // NOTICE if the html divs are not ordered in a singel line = ERROR . look for <null> tag.
                    if (sel_group_by != 'non') { // to be able to undo group by
                        console.log('sel_group_by shouldnt be non', sel_group_by);
                        var tmp_user_sel_val = $(this).children('.' + sel_group_by)[0].innerText;
                        // change spaces to underscores to avoid sorting issues with catagories starting with same word (e.g 'stone' / 'stone and..')
                        //console.log('tmp_user_sel_val: ', tmp_user_sel_val.trim());
                        //var tmp_user_sel_val_underscore = tmp_user_sel_val.trim().replace(/ /g, '_'); // NOTICE g for global 
                        //var tmp_user_sel_val_underscore = tmp_user_sel_val.trim().replace(/ /, '_'); // NOTICE chatches only first occurence

                        //console.log('underscore version: ', tmp_user_sel_val_underscore);
                        if (sel_group_by == 'primary') {
                            user_sel_lst.push(" " + tmp_user_sel_val.trim()); // NOTICE added space for sotring after cat header text - legacy mistake
                        } else {
                            user_sel_lst.push(tmp_user_sel_val); // trimming to avoid spacing mistakes // .trim()
                            //user_sel_lst.push(tmp_user_sel_val_underscore);
                        };
                    };
                } else {
                    console.log('Skipped a filtered item.');
                };
            } else {
                console.log('nullElem have not been removed.');
                null_flag = true;
            };
        }); // END >  $(".building_square").each(function(index) {

        // set most_repeted_freq and cat_lst depending on the group selected by user
        if (user_sel_lst.length > 0) {
            var cat_lst = frequency_lst(user_sel_lst);
        } else {
            var cat_lst = [];
        };
        console.log('cat_lst.length', cat_lst);
        console.log('cat_lst.length', cat_lst.length);

        if (cat_lst.length > 0) {
            // create list dump for elements
            var elems = [];
            var occu_lst = [];

            cat_lst.forEach(function(Element, index) { // extract number of repets per catagory 
                var catagory_n_elem = Element[1];
                occu_lst.push(catagory_n_elem);
            });
            var most_repeted_freq = occu_lst.reduce(function(x, y) {
                return Math.max(x, y);
            });

            cat_lst.forEach(function(Element, index) {
                var catagory = Element[0];
                //console.log('catagory passed: ', catagory);
                if (catagory == 0) {
                    console.log('Empty items in frequency_lst are returned as 0.');
                }
                var catagory_n_elem = Element[1];
                if (catagory != 0) {
                    //console.log(catagory, catagory_n_elem, most_repeted_freq - catagory_n_elem);
                    for (var i = 0; i < most_repeted_freq - catagory_n_elem; i++) { // loop until getting to the differnce between #catagory and #max
                        var $elem = $('<div class="building_square nullElem" />');
                        // add tag names
                        $elem.append(`<p class="${sel_group_by} ignore" style="display:none">` + catagory + 'a' + '</p>'); // add a to make sure the added Nulls are under 
                        //console.log($elem[0]);
                        elems.push($elem[0]);
                    }
                } else {
                    //console.log(catagory, catagory_n_elem, most_repeted_freq - catagory_n_elem);
                };

                used_cat = [...groupby_catlst];
                //console.log('catagory: ', catagory);

                //console.log(cat_lst, catagory); // cat_lst is not good // .findIndex(`${catagory}`);
                cat_index_cat_lst = used_cat.findIndex((element, index) => {
                    //console.log('element passed for index: ', element);
                    if (element.includes(`${catagory}`)) {
                        //console.log('found: ', element);
                        return true
                    }
                });
                //console.log("this catagory's index is: ", cat_index_cat_lst);

                // add catagory name 
                var $elem = $('<div class="building_square nullElem " col_header="a"/>'); // NOTICE - col_header
                $elem.append(`<h4 class="${sel_group_by} ignore groupByColor${cat_index_cat_lst}">` + catagory + '</h4>'); // remove display:none to show ERE
                elems.push($elem[0]);
                // catagory
            });


            // insert new elements
            $grid.isotope('insert', elems);

            //console.log('added 1 to most repeted: ', most_repeted_freq); // to deal with added tags
            most_repeted_freq += 1;


        }; // avoid on return to non grouped-by

        // ------------------ Adjust container sizing ------------------- //
        // adjust container sizing if layout mode is changing from vertical or horizontal
        //console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight + ' high');


        var $this = layoutModeButtonGroup_button;

        var isHorizontalMode = !!$this.attr('data-is-horizontal');
        if (isHorizontal !== isHorizontalMode) {
            // change container size if horiz/vert change
            // format vert height : number of items in largest catagory * gutter size * img size
            // width number is automatic - change columnWidth instead?
            // img size is 70 × 47 + maring 5px
            var img_size = 52; // NOTICE 
            //grid_gutter = 70; // = rowHeight ?
            //console.log('most repeted: ', most_repeted_freq);
            var container_height = `${most_repeted_freq * img_size}px`; // grid_gutter
            //container_width = `${document.body.clientWidth}px`;
            //console.log(container_height, container_width);
            // NOTICE - only the width OR height will be taken into account - not both
            var containerStyle = isHorizontalMode ? {
                // changing to cellsByColumn
                height: container_height, //$window.height() * 20 // 'auto' //
                //width: container_width
            } : {
                // changing to fitRows
                width: 'auto' // document.body.clientWidth //
            };
            $grid.css(containerStyle);
            isHorizontal = isHorizontalMode;
        } else {
            console.log('Stayed in cells by column');
            var img_size = 52; // NOTICE 55
            var container_height = `${most_repeted_freq * img_size}px`; // grid_gutter
            var containerStyle = {
                height: container_height
            };
            $grid.css(containerStyle);
        };

        num_groups = cat_lst.length; // update global for coloring
        screen_width = document.body.clientWidth;

        colWidth = screen_width / cat_lst.length; // the user's screen divided by the number of catagories

        printcolwidth(); // check change in global


        // change layout mode
        var layoutModeValue = $this.attr('data-layout-mode');

        console.log('layoutModeValue: ', layoutModeValue);
        if (layoutModeValue === undefined) { // NOTICE to work with filter
            console.log('passing undefined order');
            layoutModeValue = 'fitRows';
        };
        console.log("sel_group_by after verification:", layoutModeValue);

        $grid.isotope({ layoutMode: layoutModeValue });

        /*
    var all_grid_elems = $grid.isotope('getItemElements');
    first_img_height = $(all_grid_elems[0]).height();
*/

        $grid.isotope({
            cellsByColumn: {
                columnWidth: colWidth, //120
                rowHeight: 52 // 52 first_img_height
            }
        });

        // ----------------- Sort -------------------- //
        var sortByValue = layoutModeButtonGroup_button.attr('data-sort-by');
        console.log('sorted by:', sortByValue);
        $grid.isotope({ sortBy: [sortByValue, 'col_header'] }); // [ sortByValue, 'col_header' ] // { sortBy: sortByValue }

        // ----------------- Rise group-by flag -------------------- //
        if (layoutModeValue == 'cellsByColumn') {
            flag_groupby = true;
            flag_sortby = false;
            flag_regular = false;
        };
        setTimeout(1000); // NOTICE sleep / wait 
        console.log('< -------- FINISHED  -------->');
        return 'Done';
    };
    $('.layout-mode-button-group').on('click', 'button', function() {
        // we can't sort and groupby at the same time
        // to make sure 'sort' is on 'original order' - click it.
        if (flag_sortby == true) { // if sorting mode is on
            if (!($("#sorts > button:first").hasClass('is-checked'))) { // and is not set to "regular" (not sorting)
                //alert('< --------- RESETTING regular sort --------- >');
                $("#sorts > button:first").click(); // return it to "regular" 
            };
        };
        // now groupby
        groupby_reinnit($(this));

    });

    $('.filters').on('click', function() { // re-innit function when button filtered
        // get currently pressed group-by button for screen adjusments
        var groupby_status_button = $('#group-sort > button.is-checked');
        if (!(groupby_status_button.attr('data-group-by') == 'non')) { // if group-by is off - ignore

            async function refresh_groupby() {
                flag_refresh_groupby = true; // to avoid map refresh in mapall.js
                console.log("Before first click");
                await testAsync(groupby_status_button);
                console.log("After first click");
                console.log("Before second click");
                await testAsync(groupby_status_button);
                console.log("After second waiting");
                console.log("Before mapall called from multifilter");
                await mapall_reinnit();
                console.log("After mapall called from multifilter");
            }
            refresh_groupby();

        }; // CLOSE: if (!(groupby_status_button.attr('data-group-by') == 'non'))
        console.log('TOUCHED button FILTER');
        console.log('button filter pass:', groupby_status_button); // pass me to function WIP
        console.log('attr:', groupby_status_button.attr('data-group-by')); // pass me to function WIP
    });

    $('.noUi-touch-area').on('click', function() { // re-innit function when slider filters are touched
        // get currently pressed group-by button for screen adjusments
        var groupby_status_button = $('#group-sort > button.is-checked');
        if (!(groupby_status_button.attr('data-group-by') == 'non')) { // if group-by is off - ignore

            async function refresh_groupby() {
                flag_refresh_groupby = true; // to avoid map refresh in mapall.js
                console.log("Before first click");
                await testAsync(groupby_status_button);
                console.log("After first click");
                console.log("Before second click");
                await testAsync(groupby_status_button);
                console.log("After second click");
                console.log("Before mapall called from multifilter");
                await mapall_reinnit();
                console.log("After mapall called from multifilter");
            }
            refresh_groupby();
        }; // CLOSE: if (!(groupby_status_button.attr('data-group-by') == 'non'))
    }); // CLOSE: ('.noUi-touch-area').on('click', function() {

    function testAsync(groupby_status_button) {
        return new Promise((resolve, reject) => {
            //here our function should be implemented 
            setTimeout(() => {
                console.log("Inside the testAsync function");
                groupby_reinnit(groupby_status_button);
                //groupby_status_button.click();
                resolve();
            }, 2000);
        });
    };

    function mapall_reinnit() {
        return new Promise((resolve, reject) => {
            //here our function should be implemented 
            setTimeout(() => {
                console.log("Inside the mapall_reinnit function");
                flag_refresh_groupby = false; // make isotope arrangeComplete detectable for mapall.js
                // relunch the grid to reinnit the map in mapall.js WIP
                $grid.isotope();
                //$grid.isotope('reloadItems');
                resolve();
            }, 2000);
        });
    };

}); // CLOSE : $(function() {


function frequency_lst(arr) {
    //console.info('Array passed: ', arr); // NOTICE already when passed - 0 found in array
    const map = arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    //console.info(['in frquency_lst func: ', ...map.entries()]);
    groupby_catlst = [...map.keys()];
    //console.log('groupby_catlst in frequency_lst:', groupby_catlst);
    //console.info([...map.keys()]);
    //console.info([...map.values()]);
    //console.info([...map.entries()]);
    return ([...map.entries()]);

};

// Return preview letter in the alphabet 
function alpha_swap(arr) {
    const isAlpha = code => (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
    const isLast = code => code === 90 || code === 122;
    const nextLetterString = arr => {
        const strArr = arr.split('');
        return strArr.reduce((acc, val) => {
            const code = val.charCodeAt(0);
            if (!isAlpha(code)) {
                return acc + val;
            };
            if (isLast(code)) {
                return acc + String.fromCharCode(code - 25);
            };
            return acc + String.fromCharCode(code + 1);
        }, '');
    };
    console.log(nextLetterString(arr));
    return nextLetterString(arr);
};
/*
// mode function
function mode(arr) {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length -
        arr.filter(v => v === b).length
    ).pop();
}
*/


// frequency function 
/*

function frequency(arr, mod_item) {
    const map = arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    //console.info([...map.keys()]);
    //console.info([...map.values()]);
    // console.info([...map.entries()]);

    let result = arr.filter(lst_item => lst_item == mod_item);
    //console.log(result.length);
    return (result.length); // NOTICE - subtracting 1 to fix issue
};
*/

function printcolwidth() {
    console.info('global colwidth: ', window.colWidth);
};


// ------------- Pass variables for building card ------------------- //

$(function() {
    var pass_all_variables = function() {
        var all_elems = $grid.isotope('getItemElements'); // getFilteredItemElements
        passing_func(all_elems);
    }; // close: var pass_all_variables = function() {
    var pass_filtered_variables = function() {
        var filtered_elems = $grid.isotope('getFilteredItemElements'); // 
        passing_func(filtered_elems);
    };
    var passing_func = function(pass_elems) {
        localStorage.clear(); // clear all itmes saved before
        var arr_of_obj = []; // create an empty array to push to
        $.each(pass_elems, function(key, value) {
            //Create Dictionary with Object
            var dict = {};
            var p_tags = $(this).find('p');
            $.each(p_tags, function(key, value) {
                var colname = value.className;
                var colvalue = value.innerHTML;
                dict[`${colname}`] = colvalue;
            });
            arr_of_obj.push(dict);
        });
        localStorage.pushArrayItem('passed_grid_elems', arr_of_obj);
    };

    pass_all_variables(); // run one on doc start;
    $(document).ready(function() { // run on every change in grid;
        $grid.on('arrangeComplete', // 
            function(event, filteredItems) {
                pass_filtered_variables();
            });
    });
});

// ------------- functions for passing variables ------------------- //
Storage.prototype.getArray = function(arrayName) {
    var thisArray = [];
    var fetchArrayObject = this.getItem(arrayName);
    if (typeof fetchArrayObject !== 'undefined') {
        if (fetchArrayObject !== null) { thisArray = JSON.parse(fetchArrayObject); }
    }
    return thisArray;
}

Storage.prototype.pushArrayItem = function(arrayName, arrayItem) {
    var existingArray = this.getArray(arrayName);
    existingArray.push(arrayItem);
    this.setItem(arrayName, JSON.stringify(existingArray));
}

Storage.prototype.popArrayItem = function(arrayName) {
    var arrayItem = {};
    var existingArray = this.getArray(arrayName);
    if (existingArray.length > 0) {
        arrayItem = existingArray.pop();
        this.setItem(arrayName, JSON.stringify(existingArray));
    }
    return arrayItem;
}

Storage.prototype.shiftArrayItem = function(arrayName) {
    var arrayItem = {};
    var existingArray = this.getArray(arrayName);
    if (existingArray.length > 0) {
        arrayItem = existingArray.shift();
        this.setItem(arrayName, JSON.stringify(existingArray));
    }
    return arrayItem;
}

Storage.prototype.unshiftArrayItem = function(arrayName, arrayItem) {
    var existingArray = this.getArray(arrayName);
    existingArray.unshift(arrayItem);
    this.setItem(arrayName, JSON.stringify(existingArray));
}

Storage.prototype.deleteArray = function(arrayName) {
    this.removeItem(arrayName);
}

/*
common methods to manipulate arrays:

.pushArrayItem(arrayName,arrayItem); -> adds an element onto end of named array
.unshiftArrayItem(arrayName,arrayItem); -> adds an element onto front of named array
.popArrayItem(arrayName); -> removes & returns last array element
.shiftArrayItem(arrayName); -> removes & returns first array element
.getArray(arrayName); -> returns entire array
.deleteArray(arrayName); -> removes entire array from storage
*/


/*
$("#cbp-hrmenu > ul > li:nth-child(2) > a").click(function() {
    $(document).ready(function() {
        orderby_height = document.querySelector("#sortby_text");
        console.log('orderby_height', orderby_height);
        console.log('orderby_height', $(orderby_height).position().top);
        console.log('orderby_height offset', $(orderby_height).offset().top);

        //orderby_height = $(orderby_height).position().top;
        orderby_height = $(orderby_height).offset().top;
        console.log('set to bottom: ', `${orderby_height}px`);
        console.log('set this elem:', $("#order_restart"));

        $("#order_restart").css('bottom', `${orderby_height}px`);
        console.log('after css change:', $("#order_restart"));

    });
});
*/

// ------------- reset buttons ------------------- // WIP
$(document).ready(function() {
    $('#order_restart').on('click', function() {
        console.log('<------ Resetting Order ------>')
        var order_buttons = $('#innerorder').find(".button"); // select all order buttons - both 'SORT' and 'GROUPBY'
        order_buttons.removeClass("is-checked"); // deselect all order buttons 
        console.log('order_buttons', order_buttons);
    });
});