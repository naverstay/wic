var body_var, wnd, auth_popup, reg_popup,
  global_window_Height;

$(function ($) {

  body_var = $('body');
  wnd = $(window);

  $('.product_info')
    .on('tap', function (e) {
      tapCallback(e);
    });

  body_var
    .delegate('.openSearchBtn', 'click', function () {
      body_var.toggleClass('search_opened').toggleClass('popup_opened');
      return false;
    })
    .delegate('.closePopupBtn', 'click', function () {
      all_dialog_close_gl();
      return false;
    })
    .delegate('.seeAll', 'click', function () {
      $(this).toggleClass('_opened').parent().find('.seeAllBlock').slideToggle();
      return false;
    })
    .delegate('.openMobSort', 'click', function () {
      $(this).parent().toggleClass('sort_open');
      return false;
    })
    .delegate('.sortBtn', 'click', function () {
      var link = $(this);
      link.toggleClass('_up');
      return false;
    })
    .delegate('.openMobMenu', 'click', function () {
      body_var.toggleClass('menu_opened');
      return false;
    })
    .delegate('.valPlus', 'click', function () {
      var valCell = $(this).closest('.valCell'),
        inp = valCell.find('input'),
        val = parseInt(inp.val().replace(/\D/g, '')),
        min_val = 1 * inp.attr('data-min'),
        max_val = 1 * inp.attr('data-max'),
        new_val = val + (1 * inp.attr('data-step'));

      inp.val(new_val <= max_val ? (new_val >= min_val ? new_val : min_val) : max_val).focus();

      return false;
    })
    .delegate('.valMinus', 'click', function () {
      var valCell = $(this).closest('.valCell'),
        inp = valCell.find('input'),
        val = parseInt(inp.val().replace(/\D/g, '')),
        min_val = 1 * inp.attr('data-min'),
        max_val = 1 * inp.attr('data-max'),
        new_val = val - (1 * inp.attr('data-step'));

      inp.val(new_val >= min_val ? (new_val <= max_val ? new_val : max_val) : min_val).focus();

      return false;
    })
    .delegate('.collapseBtn', 'click', function () {
      var firedEl = $(this);

      if (firedEl.hasClass('_opened')) {
        firedEl.closest('.collapseHolder').find('.collapseBlock').slideToggle(600, function () {
          firedEl.removeClass('_opened').closest('.collapseHolder').removeClass('_opened');
        });
      } else {
        firedEl.closest('.collapseHolder').addClass('_opened').find('.collapseBlock').slideToggle(600, function () {
          firedEl.addClass('_opened');
        });
      }

      return false;
    })
    .delegate('.fReset', 'click', function () {
      var form = $(this).closest('form');

      form[0].reset();

      form.find('.toddler').each(function (ind) {
        var el = $(this), max = parseInt(el.attr('data-max')), min = parseInt(el.attr('data-min')),
          max_inp = $(el.attr('data-control-max')), min_inp = $(el.attr('data-control-min')),
          start = this.noUiSlider.options.start;

        this.noUiSlider.set(this.noUiSlider.options.start);

        if (min_inp.length) {
          min_inp.val(start[0]);
        }

        if (max_inp.length) {
          max_inp.val(start[1]);
        }
      });

      return false;
    })
    .delegate('.addTask', 'click', function () {
      var firedEl = $(this);

      firedEl.parent().toggleClass('_active');

      return false;
    })
    .delegate('.collapseLink', 'click', function () {
      var firedEl = $(this), target = $('.collapsed[data-collapse=' + firedEl.attr('data-collapse') + ']');

      if (target) {
        firedEl.toggleClass('expanded');
        target.toggle();
      }

      return false;
    })
    .delegate('.msgCloseBtn', 'click', function () {
      $('.msgBlock').slideToggle();

      return false;
    })
    .delegate('.openAsideMenu', 'click', function () {
      $(this).closest('.aside').toggleClass('aside_open');

      return false;
    })
    .delegate('.openAsideSub', 'click', function () {
      var cn = parseInt(window.getComputedStyle(
        this, ':after'
      ).getPropertyValue('content').replace(/\D/g, ''));

      if (cn) {
        $(this).closest('.aside').toggleClass('aside_open');
      }

      return false;
    })
    .delegate('.glOverlay', 'click', function () {
      var firedEl = $(this), target = $(firedEl.attr('href'));

      $('.megaMenuBtn').removeClass('_opened');
      $('.megaMenu').hide();
      firedEl.hide();
    })
    .delegate('.megaMenuBtn', 'click', function () {
      var firedEl = $(this), target = $(firedEl.attr('href'));

      if (target.length) {
        var show = firedEl.toggleClass('_opened').hasClass('_opened');

        toggleOverlay(show);
        target.toggle(show);
      }

    });

  initTabs();
  
  initMask();

  initSelect2();

  initValidation();

  initScrollBars();

  initAuthPopup();
  
  initRegPopup();

  //sameHeighter($('.sameHeight'));

});

function initRegPopup() {

  reg_popup = $('#reg_popup').dialog({
    autoOpen: false,
    modal: true,
    closeOnEscape: true,
    closeText: '',
    dialogClass: 'no_close_mod dialog_g_size_1',
    //appendTo: '.wrapper',
    width: 366,
    draggable: true,
    collision: "fit",
    position: {my: "top center", at: "top center", of: window},
    open: function (event, ui) {
      body_var.addClass('popup_opened');
    },
    close: function (event, ui) {
      body_var.removeClass('popup_opened');
    }
  });

  $('.regBtn').on('click', function () {
    auth_popup.dialog('close');
    reg_popup.dialog('open');

    return false;
  });
}

function initAuthPopup() {

  auth_popup = $('#auth_popup').dialog({
    autoOpen: false,
    modal: true,
    closeOnEscape: true,
    closeText: '',
    dialogClass: 'no_close_mod dialog_g_size_1',
    //appendTo: '.wrapper',
    width: 366,
    draggable: true,
    collision: "fit",
    position: {my: "top center", at: "top center", of: window},
    open: function (event, ui) {
      body_var.addClass('popup_opened');
    },
    close: function (event, ui) {
      body_var.removeClass('popup_opened');
    }
  });

  $('.authBtn').on('click', function () {
    reg_popup.dialog('close');
    auth_popup.dialog('open');

    return false;
  });
}

function tapCallback(e) {
  var el = $(e.target);

  //console.log(el[0].tagName);

  if (!((el[0].tagName).toLowerCase() == 'a' || el.closest('a').length)) {
    e.preventDefault();

    if (el.hasClass('product_unit')) {

    } else if (el.closest('.product_unit').length) {
      el = el.closest('.product_unit');
    } else {
      return;
    }

    //console.log(e, el);

    $('._hovered').not(el).removeClass('_hovered');

    if (el.hasClass('_hovered')) {
      //console.log(el.find('.product_block').attr('href'));
      document.location = el.find('.product_block').attr('href');
    } else {
      el.toggleClass('_hovered');
    }
  }
}

function fitHeight(arr) {
  var maxH = 0;

  for (var i = 0; i < arr.length; i++) {
    maxH = Math.max(maxH, $(arr[i]).outerHeight());
  }

  $(arr).css('height', maxH);
}

function sameHeighter(el) {
  if (el && el.length > 1) {
    $(el).css('height', 'auto');

    setTimeout(function () {
      var arr = [el[0]];

      for (var i = 1; i < el.length; i++) {
        var obj = $(el[i]);

        if (obj.offset().top == $(arr[0]).offset().top) {
          arr.push(el[i]);
        } else {
          fitHeight(arr);

          if (i < el.length) {
            arr = [el[i]];
          }
        }
      }

      fitHeight(arr);

    }, 0);
  }
}

function tooltipFormatter(w) {
  return formatPrice((w).toFixed());
}

function formatPrice(s) {
  return ('' + s).replace(/(?!^)(?=(\d{3})+(?=\.|$))/gm, ' ')
}

function initToddler(tdl) {

  if (!$(tdl).length) {
    tdl = $('.toddler');
  }

  tdl.each(function (ind) {
    var tdlr = this, el = $(tdlr), max = parseInt(el.attr('data-max')), min = parseInt(el.attr('data-min')),
      max_inp = $(el.attr('data-control-max')), min_inp = $(el.attr('data-control-min'));

    noUiSlider.create(tdlr, {
      start: [0, max],
      connect: true,
      step: 1,
      format: {to: tooltipFormatter, from: Number},
      range: {
        'min': min,
        'max': max
      },
      tooltips: [true, true]
    });

    tdlr.noUiSlider.on('update', function (values, handle) {

      var value = values[handle];

      if (handle) {
        max_inp.val(value.replace(/\D/g, ''));
      } else {
        min_inp.val(value.replace(/\D/g, ''));
      }
    });

    min_inp.on('input', function () {
      tdlr.noUiSlider.set([(this.value).replace(' ', ''), null]);
    });

    max_inp.on('input', function () {
      tdlr.noUiSlider.set([null, (this.value).replace(' ', '')]);
    });

  });
}

function initValidation() {
  $('.validateMe').each(function (ind) {
    var f = $(this);

    f.validationEngine({
      //binded: false,
      scroll: false,
      showPrompts: true,
      showArrow: false,
      addSuccessCssClassToField: 'success',
      addFailureCssClassToField: 'error',
      parentFieldClass: '.formCell',
      // parentFormClass: '.order_block',
      promptPosition: "centerRight",
      //doNotShowAllErrosOnSubmit: true,
      //focusFirstField          : false,
      autoHidePrompt: false,
      autoHideDelay: 3000,
      autoPositionUpdate: false,
      prettySelect: true,
      //useSuffix                : "_VE_field",
      addPromptClass: 'relative_mode one_msg',
      showOneMessage: false
    });
  });
}

function initSelect2() {

  $('.select2').each(function (ind) {
    var slct = $(this);

    slct.select2({
      minimumResultsForSearch: Infinity,
      dropdownParent: slct.parent(),
      width: '100%'
    });
  });
}

function initTabs() {

  var tabBlock = $('.tabBlock');

  tabBlock.each(function (ind) {
    var tab = $(this);

    tab.tabs({
      active: 0,
      tabContext: tab.data('tab-context'),
      activate: function (e, u) {
      
      },
      create: function (e, u) {
     
      }
    });
  });
}

function initMask(el) {

  if (el == void 0) {
    el = $("input");
  }

  el.each(function (i, el) {
    var inp = $(el), param = {};

    if (inp.attr('data-inputmask') != void 0) {
      inp.inputmask();
    }

    if (inp.attr('data-inputmask-email') != void 0) {
      param.regex = inp.attr('data-inputmask-email');
      param.placeholder = '_';

      inp.inputmask('Regex', param);
    }

    if (inp.attr('data-inputmask-regex') != void 0) {
      inp.inputmask('Regex', param);
    }

    if (inp.attr('data-inputmask-custom') != void 0) {
      inp.inputmask(JSON.parse('{' + inp.attr('data-inputmask-custom').replace(/'/g, '"') + '}'));
    }

  });
}

function toggleOverlay(show) {
  $('.glOverlay').toggle(show);
}

function initScrollBars() {

  if ($('.mCSB').length) {
    $('.mCSB').mCustomScrollbar({
      documentTouchScroll: true,
      mouseWheel: {
        preventDefault: true
      },
      theme: "dark",
      scrollEasing: "linear"
    });
  }

}

function all_dialog_close() {
  body_var.on('click', '.ui-widget-overlay', all_dialog_close_gl);
}

function all_dialog_close_gl() {
  body_var.removeClass('popup_opened').removeClass('search_opened');

  $(".ui-dialog-content").each(function () {
    var $this = $(this);
    if (!$this.parent().hasClass('always_open')) {
      $this.dialog("close");
    }
  });
}

$(window).resize(function () {

  //sameHeighter($('.sameHeight'));

});
