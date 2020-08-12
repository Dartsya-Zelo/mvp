(function($) {
    $('[data-ride="carousel"]').each(function(i, el) {
        var el = $(el);
        var total = el.find('.carousel-item').length;

        el.on('slide.bs.carousel', function(event) {
            var items = Math.round(el.find('.carousel-inner').innerWidth() / el.find('.active.carousel-item').outerWidth());
            if (items == 1) return;
            if ('left' == event.direction && event.to + items > total) {
                $('.carousel-item', el).eq(0).appendTo($('.carousel-inner', el));
            }
            if ('right' == event.direction && 0 == event.from) {
                $('.carousel-item', el).eq(total - 1).prependTo($('.carousel-inner', el));
            }
        }).bcSwipe({ threshold: 20 });
        el.find('>a').show();
    });
    $(window).resize(function(event) {
        $('[data-ride="carousel"]').each(function(i, el) {
            var el = $(el).removeClass('hide-controls');
            var total = el.find('.carousel-item').length;
            if (el.find('.carousel-inner').innerWidth() >= el.find('.active.carousel-item').outerWidth() * total)
                el.addClass('hide-controls');
        });
    }).resize();

    $(window).scroll(function(event) {
        var e = (document.scrollingElement || document.documentElement).scrollTop;
        if (e > 45) {
            $('header .nav-top-menu .navbar').addClass("fixed-top navbar-dark").removeClass('navbar-light').find('#orders').removeClass('btn-outline-secondary').addClass('btn-outline-light');
        } else {
            $('header .nav-top-menu .navbar').removeClass("fixed-top navbar-dark").addClass('navbar-light').find('#orders').removeClass('btn-outline-light').addClass('btn-outline-secondary');
        }
    }).scroll();

    $('.footer-nav-menu h3').click(function (event) {
        $(this).toggleClass('on');
    });

    $('.header-nav-top [data-toggle="popover"]').popover({
        container: 'body',
        html: true,
        placement: 'bottom',
        content: function() {
            return $($(this).data('contents')).html();
        }
    }).on('inserted.bs.popover', function(popover) {
        setTimeout(function(el) {
            var popper = $(el).data('bs.popover')._popper;
            popper.options.placement = 'bottom-end';
            popper.update();
            console.log($(el).data('bs.popover')._popper);//.data('popover').getTipElement());
        }, 20, this);
        var pop = $('#' + popover.currentTarget.getAttribute('aria-describedby')).addClass('popover-right')
        pop.css('left', (pop.width() - 20) + 'px');
    });
    $('.filter [data-toggle="popover"]').popover({
        container: '#place',
        html: true,
        placement: 'bottom',
        content: function() {
            return $('#filter-sm-block').html();
        }
    })
    // close popovers on click outside
    $(document).on('click', function (e) {
        $('[data-toggle="popover"],[data-original-title]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {                
                (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
            }

        });
    });

    $('#refine-dialog a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        $(this).removeClass('active');
    })

    if ($('#sticky-product-info').length) {
        $(window).scroll(function() {
            var el = $('#sticky-product-info');
            var y = el.parent().position().top;
            if (el.parent().position().top < $(window).scrollTop()) {
                el.hasClass('show') || el.addClass('show');
            } else {
                el.removeClass('show');
            }
        }).scroll();
    }
})(jQuery);