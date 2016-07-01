$(() => {
  // fullpage
  const execFullpageJs = (() => {
    const $fullpage = $('#fullpage');
    $fullpage.fullpage({
      anchors: ['', 'about', 'skills', 'works', 'products', 'links']
    });
    $fullpage.css('opacity', 1);
  })();


  // sytax highlight
  hljs.initHighlightingOnLoad();


  // profile tab
  const execProfileTab = (() => {
    const $switch = $('.js-tab-switch');
    const $list = $('.js-tab-list');
    const $wrapper = $list.parent();
    const $item = $list.find('li');
    const itemLen = $item.length;
    let index = 0;
    let listArr = [];
    let timerID;

    function setSize() {
      const wrapperWidth = $wrapper.width();
      let itemHeightArr = [];

      $item.width(wrapperWidth).each(function(i) {
        itemHeightArr[i] = $(this).height();
      });
      $list.width(wrapperWidth * itemLen);
      $wrapper.height(Math.max.apply(null, itemHeightArr));

      for (var i = 0; i < itemLen; i++) {
        listArr[i] = - (i * wrapperWidth);
      }

      moveList();
    }

    function moveList() {
      $list.css('left', listArr[index]);
    }

    setSize();
    $(window).on('resize', () => {
      if (timerID) {
        clearTimeout(timerID);
      }

      timerID = setTimeout(() => {
        setSize();
      }, 200);
    });

    $switch.on('click', function(e) {
      e.preventDefault();

      const $this = $(this);
      index = $this.parent().index();
      $switch.removeClass('is-active');
      $this.addClass('is-active');
      moveList();
    });
  })();

  // products slide
  const execProductsSlide = (() => {
    const $wrap = $('.js-album-wrap');
    const $slider = $wrap.children();
    const listWidth = $wrap.width();
    const listLen = $slider.children('li').length;
    const $pager = $('.js-album-btn');
    let animateFlag = false;
    let left = 0;
    let timerID;

    $slider.width(listWidth * listLen);

    $pager.on('click', function(e) {
      e.preventDefault();

      if (animateFlag) {
        return false;
      }
      animateFlag = true;

      const $target = $(e.target);
      let $clone;
      let moveNum = 0;

      if ($target.hasClass('is-start')) {
        animateFlag = false;
        return startSlideLoop();
      } else if ($target.hasClass('is-stop')) {
        animateFlag = false;
        return stopSlideLoop();
      }

      if ($target.hasClass('is-prev')) {
        if (parseInt($slider.css('left'), 10) === 0) {
          left -= listWidth;
          $clone = $slider.children('li').eq(listLen - 1);
          $slider.prepend($clone).css('left', left);
        }
        left += listWidth;
      } else if ($target.hasClass('is-next')) {
        if (parseInt($slider.css('left'), 10) === - ($slider.width() - listWidth)) {
          left += listWidth;
          $clone = $slider.children('li').eq(0);
          $slider.append($clone).css('left', left);
        }
        left -= listWidth;
      }

      $slider.animate({ left }, 500, () => {
        animateFlag = false;
      });
    });

    const startSlideLoop = () => {
      toggleBtnClass('is-stop');

      timerID = setInterval(function() {
        $pager.each(function() {
          const $this = $(this);

          if ($this.hasClass('is-next')) {
            $this.trigger('click');
          }
        });
      }, 3000);
    };
    const stopSlideLoop = () => {
      toggleBtnClass('is-start');
      clearInterval(timerID);
    };
    const toggleBtnClass = className => {
      $pager.each(function() {
        const $this = $(this);
        $this.parent().removeClass('is-active');

        if ($this.hasClass(className)) {
          $this.parent().addClass('is-active');
        }
      });
    }
  })();
});
