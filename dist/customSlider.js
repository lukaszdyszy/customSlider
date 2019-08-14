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
    this.duration = args.duration || '1s';
    this.container = document.querySelector(this.alias);
    this.container.style.overflow = 'hidden';
    this.slideWrapper = this.container.querySelector('.slide-wrapper');
    this.nr_o_slides = this.slideWrapper.querySelectorAll('.slide').length;
    this.width = this.container.getBoundingClientRect().width;
    this.height = this.container.getBoundingClientRect().height;
    this.slideWrapper.style.display = 'flex';
    this.slideWrapper.style.transition = 'transform';
    this.slideWrapper.style.transitionDuration = this.duration;

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

    this.changeSlide();
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
  }]);

  return Slider;
}();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Slider;
}
