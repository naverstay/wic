var boardGrid;

$(function ($) {
  
  initBoard();

  initToddler();

  body_var
    .delegate('.toggleFilter', 'click', function () {
      var firedEl = $(this), target = $(firedEl.attr('href'));

      if (target.length) {
        firedEl.toggleClass('_opened');
        target.slideToggle();
      }

      return false;
    });

});

function initBoard() {

  boardGrid = $('.boardGrid').isotope({
    percentPosition: true,
    gutter: 0,
    // main isotope options
    itemSelector: '.gridItem',
    // set layoutMode
    layoutMode: 'packery'
  });
}

$(window).resize(function () {

  if (boardGrid && boardGrid.length) {
    boardGrid.isotope('layout');
  }

});
