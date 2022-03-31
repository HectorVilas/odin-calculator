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