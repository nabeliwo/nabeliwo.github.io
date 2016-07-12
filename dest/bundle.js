(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(function () {
  // fullpage
  var $skills = $('.js-skills');
  var $skillMeter = $skills.find('ul');
  var execFullpageJs = function () {
    var $fullpage = $('#fullpage');
    $fullpage.fullpage({
      anchors: ['', 'index', 'about', 'skills', 'works', 'products', 'links'],
      afterLoad: function afterLoad(anchorLink, index) {
        if (anchorLink === 'skills') {
          $skills.addClass('is-active');

          setTimeout(function () {
            $skillMeter.each(function () {
              var $this = $(this);

              $this.find('li').each(function (i) {
                var _this = this;

                setTimeout(function () {
                  $(_this).addClass('is-active');
                }, 1000 - i * 200);
              });
            });
          }, 900);
        }
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxFQUFFLFlBQU07O0FBRU4sTUFBTSxVQUFVLEVBQUUsWUFBRixDQUFoQjtBQUNBLE1BQU0sY0FBYyxRQUFRLElBQVIsQ0FBYSxJQUFiLENBQXBCO0FBQ0EsTUFBTSxpQkFBa0IsWUFBTTtBQUM1QixRQUFNLFlBQVksRUFBRSxXQUFGLENBQWxCO0FBQ0EsY0FBVSxRQUFWLENBQW1CO0FBQ2pCLGVBQVMsQ0FBQyxFQUFELEVBQUssT0FBTCxFQUFjLE9BQWQsRUFBdUIsUUFBdkIsRUFBaUMsT0FBakMsRUFBMEMsVUFBMUMsRUFBc0QsT0FBdEQsQ0FEUTtBQUVqQixpQkFBVyxtQkFBQyxVQUFELEVBQWEsS0FBYixFQUF1QjtBQUNoQyxZQUFJLGVBQWUsUUFBbkIsRUFBNkI7QUFDM0Isa0JBQVEsUUFBUixDQUFpQixXQUFqQjs7QUFFQSxxQkFBVyxZQUFNO0FBQ2Ysd0JBQVksSUFBWixDQUFpQixZQUFXO0FBQzFCLGtCQUFNLFFBQVEsRUFBRSxJQUFGLENBQWQ7O0FBRUEsb0JBQU0sSUFBTixDQUFXLElBQVgsRUFBaUIsSUFBakIsQ0FBc0IsVUFBUyxDQUFULEVBQVk7QUFBQTs7QUFDaEMsMkJBQVcsWUFBTTtBQUNmLDJCQUFRLFFBQVIsQ0FBaUIsV0FBakI7QUFDRCxpQkFGRCxFQUVJLE9BQU8sSUFBSSxHQUZmO0FBR0QsZUFKRDtBQUtELGFBUkQ7QUFTRCxXQVZELEVBVUcsR0FWSDtBQVdEO0FBQ0Y7QUFsQmdCLEtBQW5CO0FBb0JBLGNBQVUsR0FBVixDQUFjLFNBQWQsRUFBeUIsQ0FBekI7QUFDRCxHQXZCc0IsRUFBdkI7OztBQTJCQSxPQUFLLHNCQUFMOzs7QUFJQSxNQUFNLGlCQUFrQixZQUFNO0FBQzVCLFFBQU0sVUFBVSxFQUFFLGdCQUFGLENBQWhCO0FBQ0EsUUFBTSxRQUFRLEVBQUUsY0FB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LFFBQU0saUJBQWlCLFNBQWpCLGNBQWlCLFlBQWE7QUFDbEMsYUFBTyxJQUFQLENBQVksWUFBVztBQUNyQixZQUFNLFFBQVEsRUFBRSxJQUFGLENBQWQ7QUFDQSxjQUFNLE1BQU4sR0FBZSxXQUFmLENBQTJCLFdBQTNCOztBQUVBLFlBQUksTUFBTSxRQUFOLENBQWUsU0FBZixDQUFKLEVBQStCO0FBQzdCLGdCQUFNLE1BQU4sR0FBZSxRQUFmLENBQXdCLFdBQXhCO0FBQ0Q7QUFDRixPQVBEO0FBUUQsS0FURDtBQVVELEdBaEZ5QixFQUExQjtBQWlGRCxDQTFLRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIkKCgpID0+IHtcbiAgLy8gZnVsbHBhZ2VcbiAgY29uc3QgJHNraWxscyA9ICQoJy5qcy1za2lsbHMnKTtcbiAgY29uc3QgJHNraWxsTWV0ZXIgPSAkc2tpbGxzLmZpbmQoJ3VsJyk7XG4gIGNvbnN0IGV4ZWNGdWxscGFnZUpzID0gKCgpID0+IHtcbiAgICBjb25zdCAkZnVsbHBhZ2UgPSAkKCcjZnVsbHBhZ2UnKTtcbiAgICAkZnVsbHBhZ2UuZnVsbHBhZ2Uoe1xuICAgICAgYW5jaG9yczogWycnLCAnaW5kZXgnLCAnYWJvdXQnLCAnc2tpbGxzJywgJ3dvcmtzJywgJ3Byb2R1Y3RzJywgJ2xpbmtzJ10sXG4gICAgICBhZnRlckxvYWQ6IChhbmNob3JMaW5rLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoYW5jaG9yTGluayA9PT0gJ3NraWxscycpIHtcbiAgICAgICAgICAkc2tpbGxzLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgJHNraWxsTWV0ZXIuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpO1xuXG4gICAgICAgICAgICAgICR0aGlzLmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9LCAoMTAwMCAtIGkgKiAyMDApKTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sIDkwMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICAkZnVsbHBhZ2UuY3NzKCdvcGFjaXR5JywgMSk7XG4gIH0pKCk7XG5cblxuICAvLyBzeXRheCBoaWdobGlnaHRcbiAgaGxqcy5pbml0SGlnaGxpZ2h0aW5nT25Mb2FkKCk7XG5cblxuICAvLyBwcm9maWxlIHRhYlxuICBjb25zdCBleGVjUHJvZmlsZVRhYiA9ICgoKSA9PiB7XG4gICAgY29uc3QgJHN3aXRjaCA9ICQoJy5qcy10YWItc3dpdGNoJyk7XG4gICAgY29uc3QgJGxpc3QgPSAkKCcuanMtdGFiLWxpc3QnKTtcbiAgICBjb25zdCAkd3JhcHBlciA9ICRsaXN0LnBhcmVudCgpO1xuICAgIGNvbnN0ICRpdGVtID0gJGxpc3QuZmluZCgnbGknKTtcbiAgICBjb25zdCBpdGVtTGVuID0gJGl0ZW0ubGVuZ3RoO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgbGV0IGxpc3RBcnIgPSBbXTtcbiAgICBsZXQgdGltZXJJRDtcblxuICAgIGZ1bmN0aW9uIHNldFNpemUoKSB7XG4gICAgICBjb25zdCB3cmFwcGVyV2lkdGggPSAkd3JhcHBlci53aWR0aCgpO1xuICAgICAgbGV0IGl0ZW1IZWlnaHRBcnIgPSBbXTtcblxuICAgICAgJGl0ZW0ud2lkdGgod3JhcHBlcldpZHRoKS5lYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgaXRlbUhlaWdodEFycltpXSA9ICQodGhpcykuaGVpZ2h0KCk7XG4gICAgICB9KTtcbiAgICAgICRsaXN0LndpZHRoKHdyYXBwZXJXaWR0aCAqIGl0ZW1MZW4pO1xuICAgICAgJHdyYXBwZXIuaGVpZ2h0KE1hdGgubWF4LmFwcGx5KG51bGwsIGl0ZW1IZWlnaHRBcnIpKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtTGVuOyBpKyspIHtcbiAgICAgICAgbGlzdEFycltpXSA9IC0gKGkgKiB3cmFwcGVyV2lkdGgpO1xuICAgICAgfVxuXG4gICAgICBtb3ZlTGlzdCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVMaXN0KCkge1xuICAgICAgJGxpc3QuY3NzKCdsZWZ0JywgbGlzdEFycltpbmRleF0pO1xuICAgIH1cblxuICAgIHNldFNpemUoKTtcbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgIGlmICh0aW1lcklEKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcklEKTtcbiAgICAgIH1cblxuICAgICAgdGltZXJJRCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRTaXplKCk7XG4gICAgICB9LCAyMDApO1xuICAgIH0pO1xuXG4gICAgJHN3aXRjaC5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgIGluZGV4ID0gJHRoaXMucGFyZW50KCkuaW5kZXgoKTtcbiAgICAgICRzd2l0Y2gucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgJHRoaXMuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgbW92ZUxpc3QoKTtcbiAgICB9KTtcbiAgfSkoKTtcblxuICAvLyBwcm9kdWN0cyBzbGlkZVxuICBjb25zdCBleGVjUHJvZHVjdHNTbGlkZSA9ICgoKSA9PiB7XG4gICAgY29uc3QgJHdyYXAgPSAkKCcuanMtYWxidW0td3JhcCcpO1xuICAgIGNvbnN0ICRzbGlkZXIgPSAkd3JhcC5jaGlsZHJlbigpO1xuICAgIGNvbnN0IGxpc3RXaWR0aCA9ICR3cmFwLndpZHRoKCk7XG4gICAgY29uc3QgbGlzdExlbiA9ICRzbGlkZXIuY2hpbGRyZW4oJ2xpJykubGVuZ3RoO1xuICAgIGNvbnN0ICRwYWdlciA9ICQoJy5qcy1hbGJ1bS1idG4nKTtcbiAgICBsZXQgYW5pbWF0ZUZsYWcgPSBmYWxzZTtcbiAgICBsZXQgbGVmdCA9IDA7XG4gICAgbGV0IHRpbWVySUQ7XG5cbiAgICAkc2xpZGVyLndpZHRoKGxpc3RXaWR0aCAqIGxpc3RMZW4pO1xuXG4gICAgJHBhZ2VyLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKGFuaW1hdGVGbGFnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGFuaW1hdGVGbGFnID0gdHJ1ZTtcblxuICAgICAgY29uc3QgJHRhcmdldCA9ICQoZS50YXJnZXQpO1xuICAgICAgbGV0ICRjbG9uZTtcbiAgICAgIGxldCBtb3ZlTnVtID0gMDtcblxuICAgICAgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoJ2lzLXN0YXJ0JykpIHtcbiAgICAgICAgYW5pbWF0ZUZsYWcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHN0YXJ0U2xpZGVMb29wKCk7XG4gICAgICB9IGVsc2UgaWYgKCR0YXJnZXQuaGFzQ2xhc3MoJ2lzLXN0b3AnKSkge1xuICAgICAgICBhbmltYXRlRmxhZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gc3RvcFNsaWRlTG9vcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoJHRhcmdldC5oYXNDbGFzcygnaXMtcHJldicpKSB7XG4gICAgICAgIGlmIChwYXJzZUludCgkc2xpZGVyLmNzcygnbGVmdCcpLCAxMCkgPT09IDApIHtcbiAgICAgICAgICBsZWZ0IC09IGxpc3RXaWR0aDtcbiAgICAgICAgICAkY2xvbmUgPSAkc2xpZGVyLmNoaWxkcmVuKCdsaScpLmVxKGxpc3RMZW4gLSAxKTtcbiAgICAgICAgICAkc2xpZGVyLnByZXBlbmQoJGNsb25lKS5jc3MoJ2xlZnQnLCBsZWZ0KTtcbiAgICAgICAgfVxuICAgICAgICBsZWZ0ICs9IGxpc3RXaWR0aDtcbiAgICAgIH0gZWxzZSBpZiAoJHRhcmdldC5oYXNDbGFzcygnaXMtbmV4dCcpKSB7XG4gICAgICAgIGlmIChwYXJzZUludCgkc2xpZGVyLmNzcygnbGVmdCcpLCAxMCkgPT09IC0gKCRzbGlkZXIud2lkdGgoKSAtIGxpc3RXaWR0aCkpIHtcbiAgICAgICAgICBsZWZ0ICs9IGxpc3RXaWR0aDtcbiAgICAgICAgICAkY2xvbmUgPSAkc2xpZGVyLmNoaWxkcmVuKCdsaScpLmVxKDApO1xuICAgICAgICAgICRzbGlkZXIuYXBwZW5kKCRjbG9uZSkuY3NzKCdsZWZ0JywgbGVmdCk7XG4gICAgICAgIH1cbiAgICAgICAgbGVmdCAtPSBsaXN0V2lkdGg7XG4gICAgICB9XG5cbiAgICAgICRzbGlkZXIuYW5pbWF0ZSh7IGxlZnQgfSwgNTAwLCAoKSA9PiB7XG4gICAgICAgIGFuaW1hdGVGbGFnID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHN0YXJ0U2xpZGVMb29wID0gKCkgPT4ge1xuICAgICAgdG9nZ2xlQnRuQ2xhc3MoJ2lzLXN0b3AnKTtcblxuICAgICAgdGltZXJJRCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICAkcGFnZXIuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICBjb25zdCAkdGhpcyA9ICQodGhpcyk7XG5cbiAgICAgICAgICBpZiAoJHRoaXMuaGFzQ2xhc3MoJ2lzLW5leHQnKSkge1xuICAgICAgICAgICAgJHRoaXMudHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSwgMzAwMCk7XG4gICAgfTtcbiAgICBjb25zdCBzdG9wU2xpZGVMb29wID0gKCkgPT4ge1xuICAgICAgdG9nZ2xlQnRuQ2xhc3MoJ2lzLXN0YXJ0Jyk7XG4gICAgICBjbGVhckludGVydmFsKHRpbWVySUQpO1xuICAgIH07XG4gICAgY29uc3QgdG9nZ2xlQnRuQ2xhc3MgPSBjbGFzc05hbWUgPT4ge1xuICAgICAgJHBhZ2VyLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0ICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgJHRoaXMucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuXG4gICAgICAgIGlmICgkdGhpcy5oYXNDbGFzcyhjbGFzc05hbWUpKSB7XG4gICAgICAgICAgJHRoaXMucGFyZW50KCkuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pKCk7XG59KTtcbiJdfQ==
