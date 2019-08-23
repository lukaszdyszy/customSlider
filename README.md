# CustomSlider.js
Simple customizable javascript slider. Made for universal usage.

## Installation

### <script> tag
```html
<script src="path_to_library/dist/customSlider.min.js"></script>
```

### module
> npm install git+https://github.com/lukaszdyszy/customSlider.git

```javascript
import Slider from 'customSlider';
```

## Usage

### HTML
```html
<div id="my-slider">

    <div class="slide-wrapper">
        <div class="slide">Sldie 1</div>
        <div class="slide">Sldie 2</div>
        <div class="slide">Sldie 3</div>
        <div class="slide">Sldie 4</div>
        <div class="slide">Sldie 5</div>
    </div>

</div>
```
The outer div must have id (e.g. "my-slider") and set width - for horizontal slider, or height - for vertical slider.

### JavaScript
```javascript
const mySlider = new Slider({
    alias: '#my-slider',
    // options
});
```

### Options
Option | Type | Default | Description
------ | -----| ------- | -----------
orientation | string | 'horizontal' | Orientation of our slider - 'horizontal' or 'vertical'.
current | number | 0 | Number of first slide (counting from 0).
transition | string | '1s' | Slide transition duration.
autoChange | boolean | false | Auto change slides in loop.
autoChangeDirection | string | 'forward' | 'forward' or 'backward'. Only if autoChange is activated.
timer | number | 1000 | When loop is activated. Time between slide changes in miliseconds.
draggable | boolean | false | Change slides by dragging/touching

### Methods
Method | Description
------ | -----------
changeSlide(nr) | Change slide to 'nr'
prevSlide() | Previous slide
nextSlide() | Next slide


## Example
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Custom slider example</title>

    <style>
        
        .container{
            max-width: 550px;
            margin: 0 auto;
        }

        #my-slider-horizontal{
            width: 100%;
            height: 300px;
            position: relative;
        }
        .hor{
            background-color: beige;
        }

        #my-slider-vertical{
            width: 100%;
            height: 300px;
        }
        .ver{
            background-color: red;
        }

        .slide{
            border: 1px solid black;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        /* nav */
        .prev, .next{
            position: absolute;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 15px;
            font-size: 3rem;
        }
        .prev{
            top: 0;
            left: 0;
        }
        .next{
            top: 0;
            right: 0;
        }
        .prev:hover, .next:hover{
            cursor: pointer;
        }

        ul.navigation{
            width: 100%;
            list-style-type: none;
            display: flex;
            justify-content: center;
            font-size: 2rem;
            font-weight: bold;
            padding: 0;
            margin: 0;
        }
        ul.navigation li{
            padding: 10px;
        }
        ul.navigation li:hover{
            cursor: pointer;
        }

    </style>
</head>
<body>
    
    <div class="container">

        <div id="my-slider-horizontal">
            <div class="slide-wrapper">
                <div class="slide hor">Sldie 1</div>
                <div class="slide hor">Sldie 2</div>
                <div class="slide hor">Sldie 3</div>
                <div class="slide hor">Sldie 4</div>
                <div class="slide hor">Sldie 5</div>
            </div>

            <div class="prev">&lt;</div>
            <div class="next">&gt;</div>
        </div>

        <div id="my-slider-vertical">
            <div class="slide-wrapper">
                <div class="slide ver">Sldie 1</div>
                <div class="slide ver">Sldie 2</div>
                <div class="slide ver">Sldie 3</div>
                <div class="slide ver">Sldie 4</div>
                <div class="slide ver">Sldie 5</div>
            </div>
        </div>
        <ul class="navigation">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
        </ul>

    </div>

    <script src="dist/customSlider.min.js"></script>
    <script>
        const horizontal = new Slider({
            alias: '#my-slider-horizontal', 
            current: 3
        });
        document.querySelector('.prev').addEventListener("click", function(){
            horizontal.prevSlide();
        });
        document.querySelector('.next').addEventListener("click", function(){
            horizontal.nextSlide();
        });

        const vertical = new Slider({
            alias: '#my-slider-vertical', 
            current: 0, 
            orientation: 'vertical', 
            transition: '0.3s',
            autoChange: true,
            autoChangeDirection: 'backward',
            timer: 2000
        });
        document.querySelectorAll('ul.navigation > li').forEach(function(el, index){
            el.addEventListener("click", function(){
                vertical.changeSlide(index);
            })
        });
    </script>
</body>
</html>
```
## Demo
[https://lukaszdyszy.github.io/customSlider/](https://lukaszdyszy.github.io/customSlider/)