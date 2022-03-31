let numbersOnScreen = undefined;
let operand = undefined;
let operator = undefined;
let mathDone = false;
const lcd = document.querySelector(".lcd");



clearScreen();//temporal, remove commas until I make a generator

drawDigits() //draw digital numbers, no active sticks yet
drawCommas() 



/*-----numbers and comma-----*/
const btnNumbers = document.querySelectorAll(".number");
btnNumbers.forEach(btn => {
	btn.addEventListener("click", () => drawScreen(`${btn.id[1]}`));
});

/*-----operators-----*/
const btnDelete = document.querySelector("#delete");
btnDelete.addEventListener("click", () => {
    numbersOnScreen = undefined;
    operand = undefined;
    operator = undefined;
    drawScreen(undefined);
});

//[+][-][*][/]
const btnOperators = document.querySelectorAll(".operator");
btnOperators.forEach(op => {
	op.addEventListener("click", () => ready(op.getAttribute("data-operator")));
});

const btnEqual = document.querySelector("#equal");
btnEqual.addEventListener("click", () => {
    calculate()
});


//using the keyboard
window.addEventListener("keypress", (e) => {
    let numbers = "0123456789";
    if(numbers.includes(e.key)){
        drawScreen(e.key);
    };
});

/*-----main fuction to draw screen-----*/
function drawScreen(val){
    clearScreen();
    writeScreen(val);
};

function clearScreen(){
    while(lcd.hasChildNodes()){
        lcd.removeChild(lcd.firstChild);
    };
};

function writeScreen(val){
    let newText = document.createElement("div");
    newText.className = "numbers";
    if(numbersOnScreen === undefined){
        numbersOnScreen = val;
    } else if(mathDone){
        mathDone = false;
        operand = undefined;
    } else {
        numbersOnScreen = numbersOnScreen+val;
    };
    newText.innerText = numbersOnScreen;
    newText.style.fontSize = "50px";
    lcd.appendChild(newText);
};

function calculate(){
    if(numbersOnScreen !== undefined && operand !== undefined && operator !== undefined){
        let result;
        switch(operator){
            case "*":
                result = (parseFloat(operand) * parseFloat(numbersOnScreen));
                break;
            case "-":
                result = parseFloat(operand) - parseFloat(numbersOnScreen);
                break;
            case "/":
                result = parseFloat(operand) / parseFloat(numbersOnScreen);
                break;
            case "+":
                result = parseFloat(operand) + parseFloat(numbersOnScreen);
                break;
            default:
                break;
        }
        if(result == Infinity){
            numbersOnScreen = "ERROR!!!!!"
        } else {
            numbersOnScreen = result;
        }
        mathDone = true;
        drawScreen(numbersOnScreen);
        operator = undefined;
        if(mathDone){
            operand = result;
        }
    }
}

//check for two operands and an operator
function ready(operat){
    if(numbersOnScreen === undefined){
        return;
    } else if(operand === undefined){
        operand = numbersOnScreen;
        numbersOnScreen = undefined;
        operator = operat;
    } else {
        calculate()
        operand = numbersOnScreen;
        numbersOnScreen = undefined;
        operator = operat; //check if needed
    }
}


//digit generator
function drawDigits(){
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
}

//function drawDigit(){
//
//};

//commas generator
function drawCommas(){
    let commas = document.createElement("div");
    commas.className = "commas";

    for(let i = 0; i < 10; i++){
        let commaSeparator = document.createElement("div");
        commaSeparator.className = "comma-separator";
        let comma = document.createElement("div");
        comma.className = "comma";
        if(i != 9){//removes an unnecesary comma
            commaSeparator.appendChild(comma);
        }
        commas.appendChild(commaSeparator);
    }
    lcd.appendChild(commas);
}

/*debugging*/
window.addEventListener("click", () => {
    console.clear()
    console.log(numbersOnScreen + "\n" + operator + "\n" + operand + "\n" + mathDone);
});
