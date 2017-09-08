var partnersSlider;

$(function ($) {

  body_var
    .delegate('.addToCart', 'click', function () {
      var firedEl = $(this), unit = $(firedEl.closest('.product_unit')),
        cartIcon = $('.cartIcon'), replacer = $('<div class="product_unit _buy_box"><a class="product_block" href="#"><div class="product_bg"></div><div class="product_status _in_cart">Товар добавлен в&nbsp;корзину</div></a></div>');

      unit.addClass('_clone').css({'top': unit.offset().top, 'left': unit.offset().left}).replaceWith(replacer);

      $('.wrapper').append(unit);

      unit.animate(
        {'top': cartIcon.offset().top - unit.outerHeight() / 2, 'left': cartIcon.offset().left - unit.outerWidth()},
        function () {
          unit.remove();
        });

      setTimeout(function () {
        replacer.fadeOut(600, function () {
          replacer.parent().remove();
        });
      }, 3000);

      return false;
    })
    .delegate('.toggleFilter', 'click', function () {
      var firedEl = $(this), target = $(firedEl.attr('href'));

      if (target.length) {
        firedEl.toggleClass('_opened');
        target.slideToggle();
      }

      return false;
    });

  partnersSlider = $('.partnersSlider').slick({
    //variableWidth: true,
    dots: false,
    mobileFirst: true,
    infinite: true,
    arrows: true,
    swipe: true,
    accessibility: false,
    autoplay: false,
    autoplaySpeed: 3000,
    //centerMode: true,
    //variableWidth: true,
    speed: 600,
    zIndex: 1,
    initialSlide: 0,
    //asNavFor: '.activeTabSlider, .productOptionSlider',
    //centerPadding: '0',
    slide: '.partnersSlider .slide',
    prevArrow: '.partnersSlider .slide_prev',
    nextArrow: '.partnersSlider .slide_next',

    slidesToShow: 2,
    slidesToScroll: 2,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5
        }
      }
    ]
  });

  initToddler();

  initRelatedSlider();
  
});

function initRelatedSlider(relatedSlider) {

  if (relatedSlider == void 0) {
    relatedSlider = $('.relatedSlider');
  }
  
  if (!relatedSlider.length) return;

  if (wnd.width() > 767) {
    $('.relatedSlider').filter(function () {
      return $(this).hasClass('slick-initialized');
    }).slick('unslick');
  } else {
    $('.relatedSlider').filter(function () {
      return !$(this).hasClass('slick-initialized');
    }).each(function (ind) {
      var sld = $(this);

      sld.slick({
        infinite: false,
        speed: 1000,
        autoplaySpeed: 7000,
        autoplay: false,
        dots: false,
        arrows: false,
        mobileFirst: true,
        //cssEase: 'easeOutQuad',
        zIndex: 0,
        initialSlide: 0,
        //centerPadding: '0',
        slide: '.relatedSlider .filter_l_item',
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        touchThreshold: 10,
        responsive: [
          {
            breakpoint: 768,
            settings: "unslick"
          }

          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });
    });
  }
}

function tooltipFormatter(w) {
  return formatPrice((w).toFixed());
}

function formatPrice(s) {
  return ('' + s).replace(/(?!^)(?=(\d{3})+(?=\.|$))/gm, ' ')
}

$(window).resize(function () {
  
  initRelatedSlider();

});
