class Slider {

    constructor(args = {}){
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

        if(this.draggable){
            let self = this;
            let startX;
            let startY;
            let trnslX;
            let trnslY;
            let stopX;
            let stopY;

            // for desktops
            self.slideWrapper.addEventListener('mousedown', function(e){
                this.style.transitionDuration = '0s';
                startX = e.clientX;
                startY = e.clientY;
                trnslX = -(self.width * self.current);
                trnslY = -(self.height * self.current);

                this.addEventListener('mousemove', dragging);
                this.addEventListener('mouseup', enddrag);
            });
            function dragging(ev){
                if(ev.clientX !== undefined){
                    stopX = ev.clientX;
                    stopY = ev.clientY;
                } else{
                    stopX = ev.touches[0].clientX;
                    stopY = ev.touches[0].clientY;
                }
                if(self.orientation == 'horizontal'){
                    let diff = startX - stopX;
                    this.style.transform = 'translateX('+ (trnslX-diff) +'px)';
                } else if(self.orientation == 'vertical'){
                    let diff = startY - stopY;
                    this.style.transform = 'translateY('+ (trnslY-diff) +'px)';
                }
            }
            function enddrag(){
                this.style.transitionDuration = self.transition;
                
                if(self.orientation == 'horizontal'){
                    if(startX > stopX){self.nextSlide();}
                    if(startX < stopX){self.prevSlide();}
                } else if(self.orientation == 'vertical'){
                    if(startY > stopY){self.nextSlide();}
                    if(startY < stopY){self.prevSlide();}
                }
                this.removeEventListener('mousemove', dragging);
                this.removeEventListener('mousup', enddrag);
                this.removeEventListener('touchmove', dragging);
                this.removeEventListener('touchend', enddrag);
            }

            // for mobiles
            self.slideWrapper.addEventListener('touchstart', function(e){
                this.style.transitionDuration = '0s';
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                trnslX = -(self.width * self.current);
                trnslY = -(self.height * self.current);

                this.addEventListener('touchmove', dragging);
                this.addEventListener('touchend', enddrag);
            });
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