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
orientation | string | 'horizontal' | Orientation of our slider
current | number | 0 | Number of first slide (counting from 0)
duration | string | '1s' | Slide transition duration

### Methods
Method | Description
------ | -----------
changeSlide(nr) | Change slide to 'nr'
prevSlide() | Previus slide
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

    </div>

    <script src="dist/customSlider.min.js"></script>
    <script>
        const horizontal = new Slider({alias: '#my-slider-horizontal', current: 3});
        const vertical = new Slider({alias: '#my-slider-vertical', orientation: 'vertical', duration: '0.3s', current: 2});
    </script>
</body>
</html>
```