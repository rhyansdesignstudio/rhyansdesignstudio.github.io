var rhyans = (function() {
    if (window.location.href.indexOf('services') > -1) {
        document.querySelector('a[href="custom"]').id = 'custom';
        document.querySelector('a[href="repairs"]').id = 'repairs';
        document.querySelector('a[href="redesign"]').id = 'redesign';
        document.querySelector('a[href="#custom"]').parentNode.style.textAlign = 'center';
    }

    var imgHeightOffset = function() {
        for (var i = 0; i < document.getElementsByClassName('visible').length; i++) {
            document.getElementsByClassName('visible')[i].parentNode.style.height = document.getElementsByClassName('visible')[i].height + 'px';
        }
    };


    var startCarousel = function(carousel_section) {
        console.log(carousel_section);
        var carousel_items = [],
            runCarousel;

        for (i = 0; i < document.querySelectorAll('img[alt="' + carousel_section + '"').length; i++) {
            carousel_items.push(document.querySelectorAll('img[alt="' + carousel_section + '"')[i]);
            carousel_items[i].parentNode.id = carousel_section;
            carousel_items[i].parentNode.className = '';
            carousel_items[i].parentNode.classList.add('carousel');
            carousel_items[i].parentNode.style.position = 'relative';
        }

        document.querySelectorAll('#' + carousel_section + ' img:first-of-type')[0].classList.add('visible');
        moveCarousel(carousel_section, carousel_items);
    };

    var moveCarousel = function(carousel_section, carousel_items) {
        var carousel = carousel_items,
            currentlyVisible = 0,
            nextVisible = 1;
        setInterval(function() {
            carousel[currentlyVisible].classList.remove('visible');
            carousel[nextVisible].classList.add('visible');
            imgHeightOffset();

            currentlyVisible = nextVisible;
            if (nextVisible === carousel.length - 1) {
                nextVisible = 0;
            } else {
                nextVisible++;
            }
        }, 2500);
    };

    return {
        startCarousel: startCarousel,
        imgHeightOffset: imgHeightOffset
    };
}());

var carousels = [],
    carousel_classes = [];

carousels.push(document.querySelectorAll('img:not([alt=""]):not([id="logo"])'));
for (var i = 0; i < carousels[0].length; i++) {
    carousel_classes.push(carousels[0][i].alt);
}

var carousel_classes = carousel_classes.reduce(function(a, b) {
    if (a.indexOf(b) < 0) a.push(b);
    return a;
}, []);


for (var newCarousel in carousel_classes) {
    rhyans.startCarousel(carousel_classes[newCarousel]);
}

rhyans.imgHeightOffset();

window.onresize = function() {
    rhyans.imgHeightOffset();
};