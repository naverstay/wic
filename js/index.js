var heroSlider, popularSlider, activeSlide, tl, tl1;

$(function ($) {

  activeSlide = $('.heroSlider .slide').first().addClass('_current');

  $('.wrapper').addClass('_load_anim');

  body_var
    .delegate('.animPrev', 'click', function () {
      var prev = getPrevSlide(activeSlide);

      setActiveSlide(prev);

    })
    .delegate('.animNext', 'click', function () {
      var next = getNextSlide(activeSlide);

      setActiveSlide(next);

    });

  /*  heroSlider = $('.heroSlider')
      .on('init', function (event, slick, direction) {
          console.log('init');
        }
      )
      .on('afterChange', function (event, slick, direction) {
  
        }
      )
      .on('beforeChange', function (event, slick) {
        slick.$slides.removeClass('prevdiv');
  
        for (var i = 0; i < slick.$slides.length; i++) {
          var $slide = $(slick.$slides[i]);
          if ($slide.hasClass('slick-current')) {
            $slide.addClass('prevdiv');
            break;
          }
        }
  
      })
      .slick({
        //variableWidth: true,
        dots: false,
        mobileFirst: true,
        fade: true,
        infinite: true,
        arrows: true,
        swipe: true,
        accessibility: false,
        autoplay: false,
        autoplaySpeed: 3000,
        //centerMode: true,
        //variableWidth: true,
        speed: 0,
        zIndex: 1,
        initialSlide: 0,
        //asNavFor: '.activeTabSlider, .productOptionSlider',
        //centerPadding: '0',
        slide: '.heroSlider .slide',
        prevArrow: '.heroSlider .slide_prev',
        nextArrow: '.heroSlider .slide_next',
  
        //slidesToShow: 3,
        slidesToScroll: 1,
        touchThreshold: 10
      });
      */

  popularSlider = $('.popularSlider').slick({
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
    slide: '.popularSlider .slide',
    prevArrow: '.popularSlider .slide_prev',
    nextArrow: '.popularSlider .slide_next',

    variableWidth: true,
    slidesToShow: 1,

    slidesToScroll: 1,
    touchThreshold: 10,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }
    ]
  });

});

function setActiveSlide(el) {

  if (!$('.heroSlider').hasClass('_busy')) {
    $('.heroSlider').addClass('_busy');

    var anim_time = .5;
    var img = el.find('.hero_img');
    var text = el.find('.hero_text');
    var product_unit = el.find('.product_unit');
    var product_text = el.find('.product_info');

    var roller = $('<div class="slide_roller"><div class="img_w"></div></div>');

    var next_prod = $('<div class="slide_roller"><div class="img_w"></div></div>');

    var next_caption = $('<div class="slide_text"></div>').append(text.find('.hero_caption').clone());

    var next_text = $('<div class="slide_text"></div>').append(product_text.find('.product_info_inner').clone());

    tl = new TimelineLite();
    tl1 = new TimelineLite();

    roller.find('.img_w').append(img.clone().css('width', img.outerWidth()));
    next_prod.find('.img_w').append(product_unit.find('.product_block').clone());

    next_prod.find('.product_block').css('width', product_unit.find('.product_block').outerWidth());

    activeSlide.find('.hero_img').append(roller);
    activeSlide.find('.hero_text').prepend(next_caption);
    activeSlide.find('.product_info').prepend(next_text);
    activeSlide.find('.product_unit').prepend(next_prod);

    tl1.to(next_prod, anim_time, {
      width: "100%",
      repeat: 0,
      ease: Linear.easeNone,
      onComplete: function () {

      }
    })
      .set(next_prod, {className: '+=_wide'}, tl.duration() * .01)
      .set(roller, {className: '-=_wide'}, tl.duration() * .65)
      .set(next_text, {className: '+=_move'}, tl.duration() * .35);

    tl.to(roller, anim_time, {
      width: "100%",
      repeat: 0,
      ease: Linear.easeNone,
      onComplete: function () {

        activeSlide.find('.slide_roller').remove();
        activeSlide.find('.slide_text').remove();
        activeSlide.find('._move').removeClass('_move');

        el.addClass('_current').siblings().removeClass('_current');
        activeSlide = el;

        $('.heroSlider').removeClass('_busy');
      }
    })
      .set(roller, {className: '+=_wide'}, tl.duration() * .01)
      .set(roller, {className: '-=_wide'}, tl.duration() * .65)
      .set(next_caption, {className: '+=_move'}, tl.duration() * .35);
  }
}

function getPrevSlide(el) {
  return el.prev().length ? el.prev() : el.parent().children().last();
}

function getNextSlide(el) {
  return el.next().length ? el.next() : el.parent().children().first();
}

$(window).on('load', function () {
  var loader_time = 500;

  $('.loadAnimCaption').css('opacity', 0);

  var pageLoader = $('.pageLoader');

  pageLoader.addClass('_loaded');

  setTimeout(function () {
    pageLoader.fadeOut(400, function () {
      $('.wrapper').removeClass('_load_anim');
      $(window).trigger('load_anim_done');
    });
  }, 400);

}).on('load_anim_done', function () {

  setTimeout(function () {
    $('.loadAnimCaption').animate({'opacity': 1}, 500, function () {
      $('.loadAnimCaption').removeAttr('style');
    });
  }, 400);

});

