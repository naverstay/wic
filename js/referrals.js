var mcsb, position = 0;

$(function ($) {

  body_var
    .delegate('.refInfoLink', 'click', function () {
      var link = $(this), target = $('.purchases[data-purchase=' + link.attr('data-purchase') + ']');

      if (target.length) {
        if (target.is(':visible')) {
          target.hide();
          link.removeClass('_opened');
        } else {
          target.show();
          link.addClass('_opened');
        }
      }

      return false;
    })
    .delegate('.refEditLink', 'click', function () {
      var link = $(this), table = link.closest('table'),
        edit = table.find('tr[data-edit=' + link.attr('data-edit') + ']'),
        editable = table.find('tr[data-editable=' + link.attr('data-edit') + ']');
      
      if (edit.length && editable.length) {
        if (edit.is(':visible')) {
          edit.removeClass('edit_mode').hide();
          editable.addClass('edit_mode').show();
        } else {
          editable.removeClass('edit_mode').hide();
          edit.addClass('edit_mode').show();
        }
      }

      return false;
    });

});


$(window).resize(function () {


});
