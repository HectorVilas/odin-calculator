let numbersOnScreen = undefined;
let operand = undefined;
let operator = undefined;
let mathDone = false;
const lcd = document.querySelector(".lcd");

//drawScreen(""); //cleaning screen before starting

/*-----numbers-----*/
//so much repetition! must find a way to "D.R.Y."
const btnN0 = document.querySelector("#n0");
btnN0.addEventListener("click", () => drawScreen("0"));
const btnN1 = document.querySelector("#n1");
btnN1.addEventListener("click", () => drawScreen("1"));
const btnN2 = document.querySelector("#n2");
btnN2.addEventListener("click", () => drawScreen("2"));
const btnN3 = document.querySelector("#n3");
btnN3.addEventListener("click", () => drawScreen("3"));
const btnN4 = document.querySelector("#n4");
btnN4.addEventListener("click", () => drawScreen("4"));
const btnN5 = document.querySelector("#n5");
btnN5.addEventListener("click", () => drawScreen("5"));
const btnN6 = document.querySelector("#n6");
btnN6.addEventListener("click", () => drawScreen("6"));
const btnN7 = document.querySelector("#n7");
btnN7.addEventListener("click", () => drawScreen("7"));
const btnN8 = document.querySelector("#n8");
btnN8.addEventListener("click", () => drawScreen("8"));
const btnN9 = document.querySelector("#n9");
btnN9.addEventListener("click", () => drawScreen("9"));

/*-----operators-----*/
const btnDelete = document.querySelector("#delete");
btnDelete.addEventListener("click", () => {
    numbersOnScreen = undefined;
    operand = undefined;
    operator = undefined;
    drawScreen(undefined);
});
const btnMultiply = document.querySelector("#multiply");
btnMultiply.addEventListener("click", () => ready("*"));
const btnComma = document.querySelector("#comma");
//
const btnMinus = document.querySelector("#minus");
btnMinus.addEventListener("click", () => ready("-"));
const btnPlus = document.querySelector("#plus");
btnPlus.addEventListener("click", () => ready("+"));
const btnDivide = document.querySelector("#divide");
btnDivide.addEventListener("click", () => ready("/"));
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
                result = parseFloat(operand) * parseFloat(numbersOnScreen);
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
        numbersOnScreen = result;
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


/*debugging*/
window.addEventListener("click", () => {
    console.clear()
    console.log(numbersOnScreen + "\n" + operator + "\n" + operand + "\n" + mathDone);
});
