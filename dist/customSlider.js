"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Slider =
/*#__PURE__*/
function () {
  function Slider() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Slider);

    this.alias = args.alias;
    this.orientation = args.orientation || 'horizontal';
    this.current = args.current || 0;
    this.transition = args.transition || '1s';
    this.autoChange = args.autoChange || false;
    this.autoChangeDirection = args.autoChangeDirection || 'forward';
    this.timer = args.timer || 1000;
    this.draggable = args.draggable || false;
    this.container = document.querySelector(this.alias);
    this.container.style.overflow = 'hidden';
    this.slideWrapper = this.container.querySelector('.slide-wrapper');
    this.nr_o_slides = this.slideWrapper.querySelectorAll('.slide').length;
    this.width = this.container.getBoundingClientRect().width;
    this.height = this.container.getBoundingClientRect().height;
    this.slideWrapper.style.display = 'flex';
    this.slideWrapper.style.transition = 'transform';
    this.slideWrapper.style.transitionDuration = this.transition;

    for (var i = 0; i < this.nr_o_slides; i++) {
      document.querySelector(this.alias).querySelector('.slide-wrapper').querySelectorAll('.slide')[i].style.flex = 1;
    }

    if (this.orientation == 'horizontal') {
      this.slideWrapper.style.flexDirection = 'row';
      this.slideWrapper.style.width = this.width * this.nr_o_slides + 'px';
      this.slideWrapper.style.height = this.height + 'px';
    } else if (this.orientation == 'vertical') {
      this.slideWrapper.style.flexDirection = 'column';
      this.slideWrapper.style.height = this.height * this.nr_o_slides + 'px';
      this.slideWrapper.style.width = this.width + 'px';
    }

    if (this.draggable) {
      var dragging = function dragging(ev) {
        if (ev.clientX !== undefined) {
          stopX = ev.clientX;
          stopY = ev.clientY;
        } else {
          stopX = ev.touches[0].clientX;
          stopY = ev.touches[0].clientY;
        }

        if (_self.orientation == 'horizontal') {
          var diff = startX - stopX;
          this.style.transform = 'translateX(' + (trnslX - diff) + 'px)';
        } else if (_self.orientation == 'vertical') {
          var _diff = startY - stopY;

          this.style.transform = 'translateY(' + (trnslY - _diff) + 'px)';
        }
      };

      var enddrag = function enddrag() {
        this.style.transitionDuration = _self.transition;

        if (_self.orientation == 'horizontal') {
          if (startX > stopX) {
            _self.nextSlide();
          }

          if (startX < stopX) {
            _self.prevSlide();
          }
        } else if (_self.orientation == 'vertical') {
          if (startY > stopY) {
            _self.nextSlide();
          }

          if (startY < stopY) {
            _self.prevSlide();
          }
        }

        this.removeEventListener('mousemove', dragging);
        this.removeEventListener('mousup', enddrag);
        this.removeEventListener('touchmove', dragging);
        this.removeEventListener('touchend', enddrag);
      }; // for mobiles


      var _self = this;

      var startX;
      var startY;
      var trnslX;
      var trnslY;
      var stopX;
      var stopY; // for desktops

      _self.slideWrapper.addEventListener('mousedown', function (e) {
        this.style.transitionDuration = '0s';
        startX = e.clientX;
        startY = e.clientY;
        trnslX = -(_self.width * _self.current);
        trnslY = -(_self.height * _self.current);
        this.addEventListener('mousemove', dragging);
        this.addEventListener('mouseup', enddrag);
      });

      _self.slideWrapper.addEventListener('touchstart', function (e) {
        this.style.transitionDuration = '0s';
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        trnslX = -(_self.width * _self.current);
        trnslY = -(_self.height * _self.current);
        this.addEventListener('touchmove', dragging);
        this.addEventListener('touchend', enddrag);
      });
    }

    this.changeSlide();
    var self = this;

    if (this.autoChange) {
      setTimeout(function () {
        self.loop();
      }, self.timer);
    }
  }

  _createClass(Slider, [{
    key: "changeSlide",
    value: function changeSlide(nr) {
      if (nr !== undefined) {
        this.current = nr;
      }

      if (this.current >= this.nr_o_slides) {
        this.current = this.nr_o_slides - 1;
      }

      if (this.current < 0) {
        this.current = 0;
      }

      if (this.orientation == 'horizontal') {
        this.slideWrapper.style.transform = 'translateX(-' + this.current * this.width + 'px)';
      } else {
        this.slideWrapper.style.transform = 'translateY(-' + this.current * this.height + 'px)';
      }
    }
  }, {
    key: "prevSlide",
    value: function prevSlide() {
      this.current--;
      this.changeSlide();
    }
  }, {
    key: "nextSlide",
    value: function nextSlide() {
      this.current++;
      this.changeSlide();
    }
  }, {
    key: "loop",
    value: function loop() {
      var self = this;

      if (self.autoChangeDirection == 'forward') {
        if (self.current == self.nr_o_slides - 1) {
          self.current = 0;
        } else {
          self.current++;
        }
      } else {
        if (self.current == 0) {
          self.current = self.nr_o_slides - 1;
        } else {
          self.current--;
        }
      }

      self.changeSlide();

      if (self.autoChange) {
        setTimeout(function () {
          self.loop();
        }, self.timer);
      }
    }
  }]);

  return Slider;
}();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Slider;
}
