var widthThreshold1 = 992;
var widthThreshold2 = 750;

$('#back-to-top').click(function() {
    $('body,html').animate({
        scrollTop : 0
    }, 500);
});


$(document).ready(function() {

    $(function () {
        $('body').removeClass('fade-out');
    });

    $(function () {
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    },1500);
                    return false;
                }
            }
        });
    });

    // $sections includes all of the container divs that relate to menu items.
    var $sections = $('.page-content > :header');

    $(window).scroll(function() {

        // show/hide back-to-top button on scroll
        if($(this).width() >= widthThreshold2) {
            if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
                $('#back-to-top').fadeIn(50); // Fade in the arrow
            } else {
                $('#back-to-top').fadeOut(50); // Else fade out the arrow
            }
        }

        // highlight table of contents on scroll
        if($('#TableOfContents').length && $(this).width() >= widthThreshold1) {
            if ($(this).scrollTop() >= 50) { // If page is scrolled more than 50px
                $('.table-of-contents').animate({
                    top: '10px'
                }, 1000);
            }

            // currentScroll is the number of pixels the window has been scrolled
            var currentScroll = $(this).scrollTop();

            // $currentSection is somewhere to place the section we must be looking at
            var $currentSection

            // We check the position of each of the divs compared to the windows scroll position
            $sections.each(function () {
                // divPosition is the position down the page in px of the current section we are testing
                var divPosition = $(this).offset().top;

                // If the divPosition is less the the currentScroll position the div we are testing has moved above the window edge.
                // the -1 is so that it includes the div 1px before the div leave the top of the window.
                if (divPosition - 50 < currentScroll) {
                    $currentSection = $(this);
                    // This is the bit of code that uses the currentSection as its source of ID
                    var id = $currentSection.attr('id');
                    $('#TableOfContents li a').removeClass('active');
                    $("#TableOfContents li a[href=#" + id + "]").addClass('active');
                }

            });
        }
    });
});