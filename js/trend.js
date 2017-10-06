var mcsb, position = 0;

$(function ($) {

  body_var
    .delegate('.trendPrev', 'click', function () {
      if (mcsb.length) {
        var container = mcsb.find('.mCSB_container'),
          items = container.find('.stepItem');

        mcsb.mCustomScrollbar("scrollTo", $(items[Math.max(position - 1, 0)]));
      }

      return false;
    })
    .delegate('.trendNext', 'click', function () {
      if (mcsb.length) {
        var container = mcsb.find('.mCSB_container'),
          items = container.find('.stepItem');

        mcsb.mCustomScrollbar("scrollTo", $(items[Math.min(position + 1, items.length - 1)]));
      }

      return false;
    });

});

function initScroller() {
  mcsb = $('.mCSBh');

  if (mcsb.length) {

    $('.trendScrollerW').css('height', $('.stepItem').first().outerHeight());

    if (wnd.width() > 767) {
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
                H = el.outerHeight(),
                items = el.find('.stepItem');

              position = Math.floor((items.length * top + H / 2) / H);

              $('.scrollStep').toggleClass('_end', (position === items.length - 1)).text(('0' + (position + 1)).slice(-2));

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

$(window).on('load', function () {

  initScroller();

}).on('resize', function () {

  initScroller();

});
