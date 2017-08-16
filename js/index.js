var heroSlider, popularSlider;

$(function ($) {

  heroSlider = $('.heroSlider').slick({
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
    slide: '.heroSlider .slide',
    prevArrow: '.heroSlider .slide_prev',
    nextArrow: '.heroSlider .slide_next',

    //slidesToShow: 3,
    slidesToScroll: 1,
    touchThreshold: 10
  });


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

    //slidesToShow: 3,
    slidesToScroll: 1,
    touchThreshold: 10
  });


});



