var widthThreshold1 = 992;
var widthThreshold2 = 750;

// smooth scroll to top when back-to-top button is clicked
$('#back-to-top').click(function() {
    $('body,html').animate({
        scrollTop : 0
    }, 500);
});

// allows toggling of TOC
if($('#toggleTOC').length) {
    $('#toggleTOC').click(function() {
       $('#TableOfContents').toggle(500);
       $('.sidebar hr').toggle(500);
       $('#toggleTOC').toggleClass('fa-rotate-180',500);
    });
}

// Rearrange toc and content on a wider page
function reorgPage() {
  $('section.page-content').width('74%');
  $('header#title-container').width('74%');
  $('.sidebar').css({"left":"71%", "width": "20%"});
}

// Reset TOC and contents on a narrower page
function resetPage() {
  $('section.page-content').width('');
  $('header#title-container').width('');
  $('.sidebar').css({"left":"", "width": ""});
}

$(document).ready(function() {

    // $sections includes all of the container divs that relate to menu items.
    var $sections = $('.page-content :header');

    var scrollTop = $(window).scrollTop();
    var mainTop = $("main").offset().top;

    // Condense the body on a wide page
    if($(window).width() >= widthThreshold1) {
        $('body').width('85%');
    }

    // Do we have a sidebar?
    if($('.sidebar').length) {
        var tocLeft = $(".sidebar").offset().left;

        // Is the sidebar floating on the side?
        if($(window).width() >= widthThreshold1) {
            // Have we scrolled passed the main Content
            if(scrollTop <= mainTop) {
                // If not set sidebar's height = main Content's height
                $('.sidebar').offset({top : mainTop + 30, left: tocLeft});
            } else {
                // Else set sidebar's height = Scroll Top + 5px
                $('.sidebar').offset({top : scrollTop + 30 , left: tocLeft});
            }
            reorgPage(); // rearrange TOC & contents
        }
    }

    // Show our content
    $(function () {
        $('body').removeClass('fade-out');
    });

    // Set up smooth scrolling to an anchor when and anchor link is clicked
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

    // recalculate sidebar position on resizing
    $(window).resize(function() {

        // recalculate body width based on window width
        if($(window).width() >= widthThreshold1) {
            $('body').width('85%');
        } else {
            $('body').width('90%');
        }
        // Do we have a sidebar and is it floating on the side?
        if ($('.sidebar').length) {
            if ($(window).width() >= widthThreshold1) {
                var scrollTop = $(window).scrollTop();
                var mainTop = $("main").offset().top;
                var tocLeft = $(".sidebar").offset().left;

                // If we have not scrolled passed the main content?
                if (scrollTop <= mainTop) {
                    $('.sidebar').offset({ top: mainTop + 30, left: tocLeft });
                }
                reorgPage(); // rearrange TOC & contents
            } else { // is the sidebar inline
                resetPage(); // reset TOC and contents
            }
        }
    });

    $(window).scroll(function() {

        var scrollTop = $(window).scrollTop();
        var mainTop = $("main").offset().top;

        // show/hide back-to-top button on scroll
        if($(window).width() >= widthThreshold2) {
            if (scrollTop >= mainTop) {
                $('#back-to-top').fadeIn(50); // Fade in the arrow
            } else {
                $('#back-to-top').fadeOut(50); // Else fade out the arrow
            }
        }

        // Do we have a sidebar and is it floating on the side?
        if($('.sidebar').length && $(window).width() >= widthThreshold1) {

            var tocLeft = $(".sidebar").offset().left;
            // Have we scrolled passed the main Content
            if(scrollTop <= mainTop) {
                // If not set sidebar's height = main Content's height
                $('.sidebar').offset({top : mainTop + 30 , left: tocLeft});
            } else {
                // Else set sidebar's height = Scroll Top + 5px
                $('.sidebar').offset({top : scrollTop + 30 , left: tocLeft});
            }

            // $currentSection is somewhere to place the section we must be looking at
            var $currentSection

            // We check the position of each of the divs compared to the windows scroll position
            $sections.each(function () {
                // divPosition is the position down the page in px of the current section we are testing
                var divPosition = $(this).offset().top;

                // If the divPosition is less the the scrolTop position the div we are testing has moved above the window edge.
                // the -1 is so that it includes the div 1px before the div leave the top of the window.
                if (divPosition - 50 < scrollTop) {
                    $currentSection = $(this);
                    // This is the bit of code that uses the currentSection as its source of ID
                    var id = $currentSection.attr('id');
                    $('#TableOfContents li a').removeClass('active');
                    $("#TableOfContents li a[href='#" + id + "']").addClass('active');
                }

            });
        }
    });
});