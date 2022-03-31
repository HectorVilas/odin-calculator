# odin-calculator

## description

Another project: a calculator. This time i'm making a simple calculator. Nothing fancy, nothing special, just another practice.

Maybe you noticed how the buttons aren't properly aligned. That's because I'm still using `flexbox` for everything. I know `grid` would be a better solution, but I don't want to use it until I learn about it in The Odin Project.

# Live:
## https://hectorvilas.github.io/odin-calculator/

***

## update 1
Added the LCD display thingy using `<div>`s for a classic calculator look. 10 vectorial images would be a lot less work and faster to manipulate, but where is the challenge on it?

The client would be mad if they heard how I wasted time on it, but there's no client on this project, so I'll just have fun.

I copied and pasted the digit code as placeholder, just to see how it looks before making it appear using Javascript.

The original idea is to append a `div` with the digit design for every single digit, and make the digit's stick change color like in a regular calculator. We will see how it plays out.

This is how it looks for now:

![preview](./images/calc01.png)

## update 2
Now you can use the numbers on the page or in your keyboard to write on screen, but only text. The fancy LCD style will be disabled for now.
The buttons have a `hover` property so you can see what you are about to click.

## update 3
It was hard, but now the "calculator logic" is working! The equal button does nothing until it have two operands and an operator (just multiplication for now). You can also get a result pressing the operator again, get the result and store it as the first operator, so you can write the second one and keep calculating without the need of writing again everything.

I also added an event listener to show on console the two operands and the operator on every single click, so it made debugging a lot easier. Something was off, but thanks to Firefox's debugging tools I managed to discover why "2 x 2 = 8" using breakpoints.

The next step is to add function to the rest of the buttons, trying to no repeat myself. Also the actual code is a bit of a mess, needs some cleaning. The display is still a placeholder, the last step on this project will be making it functional.

## update 4
Wow! I just replaced a lot of repeated lines of code with some JS generation! Check it out!

This is the HTML code, it was repeated 10 times:
```html
<div class="digit">
    <div class="digit left">
        <div class="stick horizontal"></div>
        <div class="stick horizontal"></div>
    </div>
    <div class="digit center">
        <div class="stick vertical"></div>
        <div class="stick vertical"></div>
        <div class="stick vertical"></div>
    </div>
    <div class="digit right">
        <div class="stick horizontal active"></div>
        <div class="stick horizontal active"></div>
    </div>
</div>
```

And I just replaced that disaster with this generator:

```javascript
let digits = document.createElement("div");
digits.className = "digits";

for(let i = 0; i < 10; i++){
    let digit = document.createElement("div");
    digit.className = "digit";
    let digitLeft = document.createElement("div");
    digitLeft.className = "digit left";
    for (let i = 0; i < 2; i++) {
        let stickHorizontal = document.createElement("div");
        stickHorizontal.className = "stick horizontal";
        digitLeft.appendChild(stickHorizontal);
    }
    let digitCenter = document.createElement("div");
    digitCenter.className = "digit center";
    for (let i = 0; i < 3; i++) {
        let stickVertical = document.createElement("div");
        stickVertical.className = "stick vertical";
        digitCenter.appendChild(stickVertical);
    }
    let digitRight = document.createElement("div");
    digitRight.className = "digit right";
    for (let i = 0; i < 2; i++) {
        let stickHorizontal = document.createElement("div");
        stickHorizontal.className = "stick horizontal";
        digitRight.appendChild(stickHorizontal);
    }
    digit.appendChild(digitLeft);
    digit.appendChild(digitCenter);
    digit.appendChild(digitRight);
    digits.appendChild(digit);
}

lcd.appendChild(digits);
```
Maybe it's not big deal for real programmers, but I can't believe I managed to do it! Now the next step: do the same with the commas (update: done).

You probably already noticed that this calculator have a max of 10 digits. It was never meant to be precise, it's just me flexing my new knowledge.

## update 5
I just shrinked (optimized?) the code, replacing the repetition with a `querySelectorAll()`. All my number buttons had the class _number_ and the number itself in the ID (also used it for the comma), and took advantage of it. 20 lines of code got replaced with a single one:

```javascript
const btnNumbers = document.querySelectorAll(".number");
btnNumbers.forEach(btn => {
	btn.addEventListener("click", () => drawScreen(`${btn.id[1]}`));
});
```

Then I noticed I can use custom data attributes and get it's value with `getAttribute()`, so I took advantage of it for the operators:

```javascript
const btnOperators = document.querySelectorAll(".operator");
btnOperators.forEach(op => {
	op.addEventListener("click", () => ready(op.getAttribute("data-operator")));
});
```
I could combine those two in a single one if I also combine the `drawScreen()` and `ready()` functions, but won't save too much lines of code and would be harder to read.