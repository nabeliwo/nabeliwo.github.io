(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(function () {
  // fullpage
  var execFullpageJs = function () {
    var $fullpage = $('#fullpage');
    $fullpage.fullpage({
      anchors: ['', 'about', 'skills', 'works', 'products', 'links']
    });
    $fullpage.css('opacity', 1);
  }();

  // sytax highlight
  hljs.initHighlightingOnLoad();

  // profile tab
  var execProfileTab = function () {
    var $switch = $('.js-tab-switch');
    var $list = $('.js-tab-list');
    var $wrapper = $list.parent();
    var $item = $list.find('li');
    var itemLen = $item.length;
    var index = 0;
    var listArr = [];
    var timerID = void 0;

    function setSize() {
      var wrapperWidth = $wrapper.width();
      var itemHeightArr = [];

      $item.width(wrapperWidth).each(function (i) {
        itemHeightArr[i] = $(this).height();
      });
      $list.width(wrapperWidth * itemLen);
      $wrapper.height(Math.max.apply(null, itemHeightArr));

      for (var i = 0; i < itemLen; i++) {
        listArr[i] = -(i * wrapperWidth);
      }

      moveList();
    }

    function moveList() {
      $list.css('left', listArr[index]);
    }

    setSize();
    $(window).on('resize', function () {
      if (timerID) {
        clearTimeout(timerID);
      }

      timerID = setTimeout(function () {
        setSize();
      }, 200);
    });

    $switch.on('click', function (e) {
      e.preventDefault();

      var $this = $(this);
      index = $this.parent().index();
      $switch.removeClass('is-active');
      $this.addClass('is-active');
      moveList();
    });
  }();

  // products slide
  var execProductsSlide = function () {
    var $wrap = $('.js-album-wrap');
    var $slider = $wrap.children();
    var listWidth = $wrap.width();
    var listLen = $slider.children('li').length;
    var $pager = $('.js-album-btn');
    var animateFlag = false;
    var left = 0;
    var timerID = void 0;

    $slider.width(listWidth * listLen);

    $pager.on('click', function (e) {
      e.preventDefault();

      if (animateFlag) {
        return false;
      }
      animateFlag = true;

      var $target = $(e.target);
      var $clone = void 0;
      var moveNum = 0;

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
        if (parseInt($slider.css('left'), 10) === -($slider.width() - listWidth)) {
          left += listWidth;
          $clone = $slider.children('li').eq(0);
          $slider.append($clone).css('left', left);
        }
        left -= listWidth;
      }

      $slider.animate({ left: left }, 500, function () {
        animateFlag = false;
      });
    });

    var startSlideLoop = function startSlideLoop() {
      toggleBtnClass('is-stop');

      timerID = setInterval(function () {
        $pager.each(function () {
          var $this = $(this);

          if ($this.hasClass('is-next')) {
            $this.trigger('click');
          }
        });
      }, 3000);
    };
    var stopSlideLoop = function stopSlideLoop() {
      toggleBtnClass('is-start');
      clearInterval(timerID);
    };
    var toggleBtnClass = function toggleBtnClass(className) {
      $pager.each(function () {
        var $this = $(this);
        $this.parent().removeClass('is-active');

        if ($this.hasClass(className)) {
          $this.parent().addClass('is-active');
        }
      });
    };
  }();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxFQUFFLFlBQU07O0FBRU4sTUFBTSxpQkFBa0IsWUFBTTtBQUM1QixRQUFNLFlBQVksRUFBRSxXQUFGLENBQWxCO0FBQ0EsY0FBVSxRQUFWLENBQW1CO0FBQ2pCLGVBQVMsQ0FBQyxFQUFELEVBQUssT0FBTCxFQUFjLFFBQWQsRUFBd0IsT0FBeEIsRUFBaUMsVUFBakMsRUFBNkMsT0FBN0M7QUFEUSxLQUFuQjtBQUdBLGNBQVUsR0FBVixDQUFjLFNBQWQsRUFBeUIsQ0FBekI7QUFDRCxHQU5zQixFQUF2Qjs7O0FBVUEsT0FBSyxzQkFBTDs7O0FBSUEsTUFBTSxpQkFBa0IsWUFBTTtBQUM1QixRQUFNLFVBQVUsRUFBRSxnQkFBRixDQUFoQjtBQUNBLFFBQU0sUUFBUSxFQUFFLGNBQUYsQ0FBZDtBQUNBLFFBQU0sV0FBVyxNQUFNLE1BQU4sRUFBakI7QUFDQSxRQUFNLFFBQVEsTUFBTSxJQUFOLENBQVcsSUFBWCxDQUFkO0FBQ0EsUUFBTSxVQUFVLE1BQU0sTUFBdEI7QUFDQSxRQUFJLFFBQVEsQ0FBWjtBQUNBLFFBQUksVUFBVSxFQUFkO0FBQ0EsUUFBSSxnQkFBSjs7QUFFQSxhQUFTLE9BQVQsR0FBbUI7QUFDakIsVUFBTSxlQUFlLFNBQVMsS0FBVCxFQUFyQjtBQUNBLFVBQUksZ0JBQWdCLEVBQXBCOztBQUVBLFlBQU0sS0FBTixDQUFZLFlBQVosRUFBMEIsSUFBMUIsQ0FBK0IsVUFBUyxDQUFULEVBQVk7QUFDekMsc0JBQWMsQ0FBZCxJQUFtQixFQUFFLElBQUYsRUFBUSxNQUFSLEVBQW5CO0FBQ0QsT0FGRDtBQUdBLFlBQU0sS0FBTixDQUFZLGVBQWUsT0FBM0I7QUFDQSxlQUFTLE1BQVQsQ0FBZ0IsS0FBSyxHQUFMLENBQVMsS0FBVCxDQUFlLElBQWYsRUFBcUIsYUFBckIsQ0FBaEI7O0FB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LFNBQVI7QUFDRDs7QUFFRCxjQUFRLE9BQVIsQ0FBZ0IsRUFBRSxVQUFGLEVBQWhCLEVBQTBCLEdBQTFCLEVBQStCLFlBQU07QUFDbkMsc0JBQWMsS0FBZDtBQUNELE9BRkQ7QUFHRCxLQXZDRDs7QUF5Q0EsUUFBTSxpQkFBaUIsU0FBakIsY0FBaUIsR0FBTTtBQUMzQixxQkFBZSxTQUFmOztBQUVBLGdCQUFVLFlBQVksWUFBVztBQUMvQixlQUFPLElBQVAsQ0FBWSxZQUFXO0FBQ3JCLGNBQU0sUUFBUSxFQUFFLElBQUYsQ0FBZDs7QUFFQSxjQUFJLE1BQU0sUUFBTixDQUFlLFNBQWYsQ0FBSixFQUErQjtBQUM3QixrQkFBTSxPQUFOLENBQWMsT0FBZDtBQUNEO0FBQ0YsU0FORDtBQU9ELE9BUlMsRUFRUCxJQVJPLENBQVY7QUFTRCxLQVpEO0FBYUEsUUFBTSxnQkFBZ0IsU0FBaEIsYUFBZ0IsR0FBTTtBQUMxQixxQkFBZSxVQUFmO0FBQ0Esb0JBQWMsT0FBZDtBQUNELEtBSEQ7QUFJQSxRQUFNLGlCQUFpQixTQUFqQixjQUFpQixZQUFhO0FBQ2xDLGFBQU8sSUFBUCxDQUFZLFlBQVc7QUFDckIsWUFBTSxRQUFRLEVBQUUsSUFBRixDQUFkO0FBQ0EsY0FBTSxNQUFOLEdBQWUsV0FBZixDQUEyQixXQUEzQjs7QUFFQSxZQUFJLE1BQU0sUUFBTixDQUFlLFNBQWYsQ0FBSixFQUErQjtBQUM3QixnQkFBTSxNQUFOLEdBQWUsUUFBZixDQUF3QixXQUF4QjtBQUNEO0FBQ0YsT0FQRDtBQVFELEtBVEQ7QUFVRCxHQWhGeUIsRUFBMUI7QUFpRkQsQ0F2SkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJCgoKSA9PiB7XG4gIC8vIGZ1bGxwYWdlXG4gIGNvbnN0IGV4ZWNGdWxscGFnZUpzID0gKCgpID0+IHtcbiAgICBjb25zdCAkZnVsbHBhZ2UgPSAkKCcjZnVsbHBhZ2UnKTtcbiAgICAkZnVsbHBhZ2UuZnVsbHBhZ2Uoe1xuICAgICAgYW5jaG9yczogWycnLCAnYWJvdXQnLCAnc2tpbGxzJywgJ3dvcmtzJywgJ3Byb2R1Y3RzJywgJ2xpbmtzJ11cbiAgICB9KTtcbiAgICAkZnVsbHBhZ2UuY3NzKCdvcGFjaXR5JywgMSk7XG4gIH0pKCk7XG5cblxuICAvLyBzeXRheCBoaWdobGlnaHRcbiAgaGxqcy5pbml0SGlnaGxpZ2h0aW5nT25Mb2FkKCk7XG5cblxuICAvLyBwcm9maWxlIHRhYlxuICBjb25zdCBleGVjUHJvZmlsZVRhYiA9ICgoKSA9PiB7XG4gICAgY29uc3QgJHN3aXRjaCA9ICQoJy5qcy10YWItc3dpdGNoJyk7XG4gICAgY29uc3QgJGxpc3QgPSAkKCcuanMtdGFiLWxpc3QnKTtcbiAgICBjb25zdCAkd3JhcHBlciA9ICRsaXN0LnBhcmVudCgpO1xuICAgIGNvbnN0ICRpdGVtID0gJGxpc3QuZmluZCgnbGknKTtcbiAgICBjb25zdCBpdGVtTGVuID0gJGl0ZW0ubGVuZ3RoO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgbGV0IGxpc3RBcnIgPSBbXTtcbiAgICBsZXQgdGltZXJJRDtcblxuICAgIGZ1bmN0aW9uIHNldFNpemUoKSB7XG4gICAgICBjb25zdCB3cmFwcGVyV2lkdGggPSAkd3JhcHBlci53aWR0aCgpO1xuICAgICAgbGV0IGl0ZW1IZWlnaHRBcnIgPSBbXTtcblxuICAgICAgJGl0ZW0ud2lkdGgod3JhcHBlcldpZHRoKS5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgaXRlbUhlaWdodEFycltpXSA9ICQodGhpcykuaGVpZ2h0KCk7XG4gICAgICB9KTtcbiAgICAgICRsaXN0LndpZHRoKHdyYXBwZXJXaWR0aCAqIGl0ZW1MZW4pO1xuICAgICAgJHdyYXBwZXIuaGVpZ2h0KE1hdGgubWF4LmFwcGx5KG51bGwsIGl0ZW1IZWlnaHRBcnIpKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtTGVuOyBpKyspIHtcbiAgICAgICAgbGlzdEFycltpXSA9IC0gKGkgKiB3cmFwcGVyV2lkdGgpO1xuICAgICAgfVxuXG4gICAgICBtb3ZlTGlzdCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVMaXN0KCkge1xuICAgICAgJGxpc3QuY3NzKCdsZWZ0JywgbGlzdEFycltpbmRleF0pO1xuICAgIH1cblxuICAgIHNldFNpemUoKTtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgIGlmICh0aW1lcklEKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklEKTtcbiAgICAgIH1cblxuICAgICAgdGltZXJJRCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRTaXplKCk7XG4gICAgICB9LCAyMDApO1xuICAgIH0pO1xuXG4gICAgJHN3aXRjaC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIGluZGV4ID0gJHRoaXMucGFyZW50KCkuaW5kZXgoKTtcbiAgICAgICRzd2l0Y2gucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgbW92ZUxpc3QoKTtcbiAgICB9KTtcbiAgfSkoKTtcblxuICAvLyBwcm9kdWN0cyBzbGlkZVxuICBjb25zdCBleGVjUHJvZHVjdHNTbGlkZSA9ICgoKSA9PiB7XG4gICAgY29uc3QgJHdyYXAgPSAkKCcuanMtYWxidW0td3JhcCcpO1xuICAgIGNvbnN0ICRzbGlkZXIgPSAkd3JhcC5jaGlsZHJlbigpO1xuICAgIGNvbnN0IGxpc3RXaWR0aCA9ICR3cmFwLndpZHRoKCk7XG4gICAgY29uc3QgbGlzdExlbiA9ICRzbGlkZXIuY2hpbGRyZW4oJ2xpJykubGVuZ3RoO1xuICAgIGNvbnN0ICRwYWdlciA9ICQoJy5qcy1hbGJ1bS1idG4nKTtcbiAgICBsZXQgYW5pbWF0ZUZsYWcgPSBmYWxzZTtcbiAgICBsZXQgbGVmdCA9IDA7XG4gICAgbGV0IHRpbWVySUQ7XG5cbiAgICAkc2xpZGVyLndpZHRoKGxpc3RXaWR0aCAqIGxpc3RMZW4pO1xuXG4gICAgJHBhZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKGFuaW1hdGVGbGFnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGFuaW1hdGVGbGFnID0gdHJ1ZTtcblxuICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS50YXJnZXQpO1xuICAgICAgbGV0ICRjbG9uZTtcbiAgICAgIGxldCBtb3ZlTnVtID0gMDtcblxuICAgICAgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoJ2lzLXN0YXJ0JykpIHtcbiAgICAgICAgYW5pbWF0ZUZsYWcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0U2xpZGVMb29wKCk7XG4gICAgICB9IGVsc2UgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoJ2lzLXN0b3AnKSkge1xuICAgICAgICBhbmltYXRlRmxhZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gc3RvcFNsaWRlTG9vcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoJHRhcmdldC5oYXNDbGFzcygnaXMtcHJldicpKSB7XG4gICAgICAgIGlmIChwYXJzZUludCgkc2xpZGVyLmNzcygnbGVmdCcpLCAxMCkgPT09IDApIHtcbiAgICAgICAgICBsZWZ0IC09IGxpc3RXaWR0aDtcbiAgICAgICAgICAkY2xvbmUgPSAkc2xpZGVyLmNoaWxkcmVuKCdsaScpLmVxKGxpc3RMZW4gLSAxKTtcbiAgICAgICAgICAkc2xpZGVyLnByZXBlbmQoJGNsb25lKS5jc3MoJ2xlZnQnLCBsZWZ0KTtcbiAgICAgICAgfVxuICAgICAgICBsZWZ0ICs9IGxpc3RXaWR0aDtcbiAgICAgIH0gZWxzZSBpZiAoJHRhcmdldC5oYXNDbGFzcygnaXMtbmV4dCcpKSB7XG4gICAgICAgIGlmIChwYXJzZUludCgkc2xpZGVyLmNzcygnbGVmdCcpLCAxMCkgPT09IC0gKCRzbGlkZXIud2lkdGgoKSAtIGxpc3RXaWR0aCkpIHtcbiAgICAgICAgICBsZWZ0ICs9IGxpc3RXaWR0aDtcbiAgICAgICAgICAkY2xvbmUgPSAkc2xpZGVyLmNoaWxkcmVuKCdsaScpLmVxKDApO1xuICAgICAgICAgICRzbGlkZXIuYXBwZW5kKCRjbG9uZSkuY3NzKCdsZWZ0JywgbGVmdCk7XG4gICAgICAgIH1cbiAgICAgICAgbGVmdCAtPSBsaXN0V2lkdGg7XG4gICAgICB9XG5cbiAgICAgICRzbGlkZXIuYW5pbWF0ZSh7IGxlZnQgfSwgNTAwLCAoKSA9PiB7XG4gICAgICAgIGFuaW1hdGVGbGFnID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0U2xpZGVMb29wID0gKCkgPT4ge1xuICAgICAgdG9nZ2xlQnRuQ2xhc3MoJ2lzLXN0b3AnKTtcblxuICAgICAgdGltZXJJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAkcGFnZXIuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoJ2lzLW5leHQnKSkge1xuICAgICAgICAgICAgJHRoaXMudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSwgMzAwMCk7XG4gICAgfTtcbiAgICBjb25zdCBzdG9wU2xpZGVMb29wID0gKCkgPT4ge1xuICAgICAgdG9nZ2xlQnRuQ2xhc3MoJ2lzLXN0YXJ0Jyk7XG4gICAgICBjbGVhckludGVydmFsKHRpbWVySUQpO1xuICAgIH07XG4gICAgY29uc3QgdG9nZ2xlQnRuQ2xhc3MgPSBjbGFzc05hbWUgPT4ge1xuICAgICAgJHBhZ2VyLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgJHRoaXMucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG4gICAgICAgIGlmICgkdGhpcy5oYXNDbGFzcyhjbGFzc05hbWUpKSB7XG4gICAgICAgICAgJHRoaXMucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pKCk7XG59KTtcbiJdfQ==
