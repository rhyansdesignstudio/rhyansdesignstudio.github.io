var rhyans = (function() {
    if (window.location.href.indexOf('services') > -1) {
        document.querySelector('a[href="custom"]').id = 'custom';
        document.querySelector('a[href="repairs"]').id = 'repairs';
        document.querySelector('a[href="redesign"]').id = 'redesign';
    }

    var carousel_items = [],
        nextVisible = 0,
        runCarousel;

    for (i = 0; i < document.querySelectorAll('img').length; i++) {
        carousel_items.push(document.querySelectorAll('img')[i]);
        carousel_items[i].parentNode.classList.add(i);
    }

    carousel_items = carousel_items.splice(1, carousel_items.length);
    carousel_items[0].classList.add('visible');
    carousel_items[0].parentNode.style.position = 'relative';

    var imgHeightOffset = function() {
        document.getElementsByClassName('visible')[0].parentNode.style.height = document.getElementsByClassName('visible')[0].height + 'px';
        document.getElementsByClassName('visible')[0].parentNode.classList.add('img_float');
    };

    var startCarousel = function() {
        moveCarousel(0);
        runCarousel = setInterval(function() {
            moveCarousel(1);
        }, 2500);
    };

    var moveCarousel = function() {
        document.getElementsByClassName('visible')[0].classList.remove('visible');
        carousel_items[nextVisible].classList.add('visible');
        nextVisible++;
        if (nextVisible === carousel_items.length) {
            nextVisible = 0;
            return nextVisible;
        } else if ((nextVisible - 1) < 0) {
            nextVisible = carousel_items.length - 1;
            return nextVisible;
        }
        imgHeightOffset();
    };

    return {
        startCarousel: startCarousel,
        imgHeightOffset: imgHeightOffset
    };
}());

rhyans.startCarousel();
rhyans.imgHeightOffset();

window.onresize = function() {
    rhyans.imgHeightOffset();
};