var body_var,
  global_window_Height;

$(function ($) {

  body_var = $('body');

  body_var
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

      firedEl.toggleClass('_opened').closest('.collapseHolder').find('.collapseBlock').slideToggle();

      return false;
    })
    .delegate('.fReset', 'click', function () {
      var form = $(this).closest('form');

      form[0].reset();

      form.find('.toddler').each(function (ind) {
        var el = $(this), max = parseInt(el.attr('data-max')), min = parseInt(el.attr('data-min')), max_inp = $(el.attr('data-control-max')), min_inp = $(el.attr('data-control-min')), start = this.noUiSlider.options.start;

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
    .delegate('.msgCloseBtn', 'click', function () {
      $(this).closest('.msgBlock').slideToggle();

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

  initMask();

  initSelect2();

  initValidation();

  initScrollBars();

});

function initToddler(tdl) {

  if (!$(tdl).length) {
    tdl = $('.toddler');
  }

  tdl.each(function (ind) {
    var tdlr = this, el = $(tdlr), max = parseInt(el.attr('data-max')), min = parseInt(el.attr('data-min')), max_inp = $(el.attr('data-control-max')), min_inp = $(el.attr('data-control-min'));

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
        max_inp.val(value);
      } else {
        min_inp.val(value);
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
  $(".ui-dialog-content").each(function () {
    var $this = $(this);
    if (!$this.parent().hasClass('always_open')) {
      $this.dialog("close");
    }
  });
}
