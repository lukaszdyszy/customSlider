class Slider {

    constructor(args = {}){
        this.alias = args.alias;
        this.orientation = args.orientation || 'horizontal';
        this.current = args.current || 0;
        this.transition = args.transition || '1s';
        this.autoChange = args.autoChange || false;
        this.autoChangeDirection = args.autoChangeDirection || 'forward';
        this.timer = args.timer || 1000;

        this.container = document.querySelector(this.alias);
        this.container.style.overflow = 'hidden';
        this.slideWrapper = this.container.querySelector('.slide-wrapper');

        this.nr_o_slides = this.slideWrapper.querySelectorAll('.slide').length;

        this.width = this.container.getBoundingClientRect().width;
        this.height = this.container.getBoundingClientRect().height;

        this.slideWrapper.style.display = 'flex';
        this.slideWrapper.style.transition = 'transform';
        this.slideWrapper.style.transitionDuration = this.transition;

        for(let i = 0; i < this.nr_o_slides; i++){
            document.querySelector(this.alias).querySelector('.slide-wrapper').querySelectorAll('.slide')[i].style.flex = 1;
        }

        if(this.orientation == 'horizontal'){
            this.slideWrapper.style.flexDirection = 'row';
            this.slideWrapper.style.width = this.width*this.nr_o_slides + 'px';
            this.slideWrapper.style.height = this.height + 'px';
        } else if(this.orientation == 'vertical'){
            this.slideWrapper.style.flexDirection = 'column';
            this.slideWrapper.style.height = this.height*this.nr_o_slides + 'px';
            this.slideWrapper.style.width = this.width + 'px';
        }

        this.changeSlide();
        
        let self = this;
        if(this.autoChange){setTimeout(function(){self.loop();}, self.timer);}
    }

    changeSlide(nr){
        if(nr !== undefined){
            this.current = nr;
        }
        if(this.current >= this.nr_o_slides){
            this.current = this.nr_o_slides-1;
        }
        if(this.current < 0){
            this.current = 0;
        }

        if(this.orientation == 'horizontal'){
            this.slideWrapper.style.transform = 'translateX(-' + this.current*this.width + 'px)';
        } else {
            this.slideWrapper.style.transform = 'translateY(-' + this.current*this.height + 'px)';
        }
    }

    prevSlide(){
        this.current--;
        this.changeSlide();
    }
    nextSlide(){
        this.current++;
        this.changeSlide();
    }

    loop(){
        let self = this;
        if(self.autoChangeDirection == 'forward'){
            if(self.current == self.nr_o_slides-1){self.current = 0;}
            else{self.current++;}
        } else {
            if(self.current == 0){self.current = self.nr_o_slides-1;}
            else{self.current--;}
        }
        self.changeSlide();
        if(self.autoChange){setTimeout(function(){self.loop();}, self.timer);}
    }

}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Slider;
}