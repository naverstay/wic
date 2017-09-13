$(function ($) {

  initScroller();

});

function initScroller() {
  var mcsb = $('.mCSBh');

  if (mcsb.length) {

    if (wnd.width() > 768) {
      if (!mcsb.hasClass('mCustomScrollbar')) {
        mcsb.mCustomScrollbar({
          documentTouchScroll: true,
          mouseWheel: {
            preventDefault: true
          },
          callbacks: {
            whileScrolling: function () {
              var el = $(this).find('.mCSB_container'),
                top = el.css('top').replace(/\D/g, '') * 1,
                items = el.find('.stepItem'), step = Math.ceil(items.length * (top + 1) / el.outerHeight());

              $('.scrollStep').toggleClass('_end', (step == items.length)).text(('0' + step).slice(-2));

              $('.scrollTotal').text(('0' + items.length).slice(-2));
            }
          },
          scrollButtons: {
            enable: true,
            scrollType: "string"
          },
          axis: "y",
          theme: "dark",
          scrollEasing: "linear"
        });
      }
    } else {
      if (mcsb.hasClass('mCustomScrollbar')) {
        mcsb.mCustomScrollbar("destroy");
      }
    }
  }
}

$(window).resize(function () {

  initScroller();

});
