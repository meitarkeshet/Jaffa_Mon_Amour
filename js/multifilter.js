// This isn't necessary but it keeps the editor from thinking these external packages are typos or missing
// external js: isotope.pkgd.js
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
    layoutMode: 'fitRows',
    getSortData: {
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

        for (var prop in filters) {
            var filter = filters[prop];
            // use function if it matches
            filter = filterFns[filter] || filter;
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
}