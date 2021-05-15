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


// init Isotope
var $grid = $('.grid').isotope({
    itemSelector: '.building_square',
    layoutMode: 'fitRows', // NOTICE changed form 'fitRows' cellsByColumn  fitColumns
    cellsByColumn: {
        columnWidth: 70,
        rowHeight: 70
    },
    getSortData: {
        primary: '.primary',
        secondary: '.secondary',
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

        if ($(this).hasClass('nullElem')) {
            console.log('a null object!');
        }

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
    var sortByValue = $(this).attr('data-sort-by');
    $grid.isotope({ sortBy: sortByValue });
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

// Merging overlapping tooltips - Dosn't work at the same time as showing tooltips only when using

// mergeTooltips(id_slider, 15, ' - ');


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

// --------- FOR SLIDERS ------------


$('.img_filters').on('click', '.slider', function() {
    // get group key
    filterGroup = $(this).attr('id')
    console.log(filterGroup);
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
    $grid.isotope();
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

// to enable multiple layouts

var isHorizontal = false;
var $window = $(window);

$('.layout-mode-button-group').on('click', 'button', function() {
    // adjust container sizing if layout mode is changing from vertical or horizontal
    console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight + ' high');
    var $this = $(this);

    var isHorizontalMode = !!$this.attr('data-is-horizontal');
    if (isHorizontal !== isHorizontalMode) {
        // change container size if horiz/vert change
        // format vert height : number of items in largest catagory * gutter size * img size
        // width number is automatic - change columnWidth instead?
        var containerStyle = isHorizontalMode ? {
            height: $window.height() * 20 // 'auto' //
        } : {
            width: document.body.clientWidth // 'auto' // document.body.clientWidth //
        };
        $grid.css(containerStyle);
        isHorizontal = isHorizontalMode;
    }


    // change layout mode
    var layoutModeValue = $this.attr('data-layout-mode');
    //alert(layoutModeValue);
    $grid.isotope({ layoutMode: layoutModeValue });
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
}


// --------- Grouping ------------ //

$('.layout-mode-button-group').on('click', 'button', function() {
    // remove all previously added null items, if exist
    existing_nulls = document.getElementsByClassName('nullElem');
    $grid.isotope('remove', existing_nulls)
        // layout remaining item elements
        //.isotope('layout');


    // create empty list containers for the possible groups
    let primary_lst = [];
    let secondary_lst = [];
    // collect the information from the currently shown pictures *NOTICE is is working after Filter?
    $(".building_square").each(function(index) {
        if (!($(this).hasClass('nullElem'))) { // consider null items that are added
            var tmp_primary = $(this).text().split('\n')[25].trim();
            var tmp_secondary = $(this).text().split('\n')[26].trim();
        } else {
            var tmp_primary = '';
            var lat = '';
        };
        primary_lst.push(tmp_primary);
        secondary_lst.push(tmp_secondary);
    });
    // set most_repeted_freq and cat_lst depending on the group selected by user
    var sel_group_by = $(this).attr('data-group-by');
    console.log(sel_group_by);
    switch (sel_group_by) {
        case 'primary':
            console.log('You have selected: Primary');
            // check the max number of entries in a catagory
            var most_repeted_freq = frequency(primary_lst, mode(primary_lst));
            var cat_lst = frequency_lst(primary_lst, mode(primary_lst));
            break;
        case 'secondary':
            console.log('You have selected: Secondary');
            var most_repeted_freq = frequency(secondary_lst, mode(secondary_lst));
            var cat_lst = frequency_lst(secondary_lst, mode(secondary_lst));
            break;
        default:
            console.log('default');
            var most_repeted_freq = 0;
            var cat_lst = [];
    }

    //console.log(most_repeted_freq);
    //console.log(cat_lst);

    // create list dump for elements
    var elems = [];

    cat_lst.forEach(function(Element, index) {
        var catagory = Element[0];
        var catagory_n_elem = Element[1];
        //console.log(Element[0], Element[1]);
        for (var i = 0; i < most_repeted_freq - catagory_n_elem; i++) { // loop until getting to the differnce between #catagory and #max
            var $elem = $('<div class="building_square nullElem" />');
            $elem.append(`<p class="${sel_group_by} ignore" style="display:none">` + catagory + '</p>');
            //console.log($elem[0]);
            elems.push($elem[0]);
        }
    });

    // insert new elements
    $grid.isotope('insert', elems);
    //$grid.isotope('layout');
});

// mode function
function mode(arr) {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length -
        arr.filter(v => v === b).length
    ).pop();
}

// frequency function

function frequency(arr, mod_item) {
    const map = arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    //console.info([...map.keys()]);
    //console.info([...map.values()]);
    // console.info([...map.entries()]);

    let result = arr.filter(lst_item => lst_item == mod_item);
    //console.log(result.length);
    return result.length;
};

function frequency_lst(arr, mod_item) {
    const map = arr.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    return ([...map.entries()]);
};



// bind sort button for groups
$('.layout-mode-button-group').on('click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    console.log('sorted by:', sortByValue);
    //alert('hiiiooo');
    $grid.isotope({ sortBy: sortByValue });
});