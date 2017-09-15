$(function ($) {


  body_var.delegate('.cartRemove', 'click', function () {
    $(this).closest('li').remove();
    return false;
  });

});


$(window).resize(function () {


});
