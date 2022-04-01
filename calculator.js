let numbersOnScreen = undefined;
let operand = undefined;
let operator = undefined;
let mathDone = false;
const lcd = document.querySelector(".lcd");

//initializing screen
clearScreen();
drawDigits();
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
window.addEventListener("keydown", (e) => {
    let numbers = "0123456789";
    if(numbers.includes(e.key)){
        drawScreen(e.key);
    };
    let operators = ["+","-","*","/"];
    if(operators.includes(e.key)){
        ready(e.key);
    }
    let otherKeys = ["Enter","Backspace","Delete",".",","];

});

/*-----main fuction to draw screen-----*/
function drawScreen(val){
    clearScreen();
    writeScreen(val);
    debug();
};

function clearScreen(){
    while(lcd.hasChildNodes()){
        lcd.removeChild(lcd.firstChild);
    };
};

function writeScreen(val){
    if(numbersOnScreen === undefined){
        numbersOnScreen = val;
    } else if(mathDone){
        mathDone = false;
        operand = undefined;
    } else {
        numbersOnScreen = numbersOnScreen+val;
    };
    writeNumbers();
};

function calculate(){
    if(numbersOnScreen !== undefined && operand !== undefined && operator !== undefined){
        let result;
        switch(operator){
            case "*":
                result = (parseFloat(operand) * parseFloat(numbersOnScreen)).toString();
                break;
            case "-":
                result = (parseFloat(operand) - parseFloat(numbersOnScreen)).toString();
                break;
            case "/":
                result = (parseFloat(operand) / parseFloat(numbersOnScreen)).toString();
                break;
            case "+":
                result = (parseFloat(operand) + parseFloat(numbersOnScreen)).toString();
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

    if(operand === undefined || numbersOnScreen === undefined){
        //changin operator if there's 1 or 0 operands
        operator = operat;
    };
    if(numbersOnScreen === undefined){
        debug();
        return;
    } else if(operand === undefined){
        operand = numbersOnScreen;
        numbersOnScreen = undefined;
        operator = operat;
    } else {
        calculate()
        operand = numbersOnScreen;
        numbersOnScreen = undefined;
        operator = operat;
    }
    debug();
}


//digit generator
function drawDigits(){
    let digits = document.createElement("div");
    digits.className = "digits";

    //for(let i = 10; i > 0; i--){
    for(let i = 0; i < 10; i++){
        let digit = document.createElement("div");
        digit.className = `digit n${i}`;
        let digitLeft = document.createElement("div");
        digitLeft.className = `digit left`;
        for (let i = 0; i < 2; i++) {
            let stickHorizontal = document.createElement("div");
            stickHorizontal.className = `stick horizontal`;
            digitLeft.appendChild(stickHorizontal);
        }
        let digitCenter = document.createElement("div");
        digitCenter.className = `digit center`;
        for (let i = 0; i < 3; i++) {
            let stickVertical = document.createElement("div");
            stickVertical.className = `stick vertical`;
            digitCenter.appendChild(stickVertical);
        }
        let digitRight = document.createElement("div");
        digitRight.className = `digit right`;
        for (let i = 0; i < 2; i++) {
            let stickHorizontal = document.createElement("div");
            stickHorizontal.className = `stick horizontal`;
            digitRight.appendChild(stickHorizontal);
        }
        digit.appendChild(digitLeft);
        digit.appendChild(digitCenter);
        digit.appendChild(digitRight);
        digits.appendChild(digit);
    }

    lcd.appendChild(digits);
}


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

function writeDigit(digit, value){
	//pointing for every single stick
	let target = document.querySelector(`.digit.n${digit}`);
	let s1 = target.children[0].children[0];
	let s2 = target.children[0].children[1];
	let s3 = target.children[1].children[0];
	let s4 = target.children[1].children[1];
	let s5 = target.children[1].children[2];
	let s6 = target.children[2].children[0];
	let s7 = target.children[2].children[1];
    
	//activating the sticks depending on the number
	switch(value.toString()){
        //may not need the int
		case 0:
        case "0":
			s1.classList.add("active");
			s2.classList.add("active");
			s3.classList.add("active");
			s5.classList.add("active");
			s6.classList.add("active");
			s7.classList.add("active");
			break;
		case 1:
        case "1":
			s6.classList.add("active");
			s7.classList.add("active");
			break;
		case 2:
        case "2":
			s2.classList.add("active");
			s3.classList.add("active");
			s4.classList.add("active");
			s5.classList.add("active");
			s6.classList.add("active");
			break;
		case 3:
        case "3":
			s3.classList.add("active");
			s4.classList.add("active");
			s5.classList.add("active");
			s6.classList.add("active");
			s7.classList.add("active");
			break;
		case 4:
        case "4":
			s1.classList.add("active");
			s4.classList.add("active");
			s6.classList.add("active");
			s7.classList.add("active");
			break;
		case 5:
        case "5":
			s1.classList.add("active");
			s3.classList.add("active");
			s4.classList.add("active");
			s5.classList.add("active");
			s7.classList.add("active");
			break;
		case 6:
        case "6":
			s1.classList.add("active");
			s2.classList.add("active");
			s3.classList.add("active");
			s4.classList.add("active");
			s5.classList.add("active");
			s7.classList.add("active");
			break;
		case 7:
        case "7":
			s3.classList.add("active");
			s6.classList.add("active");
			s7.classList.add("active");
			break;
		case 8:
        case "8":
			s1.classList.add("active");
			s2.classList.add("active");
			s3.classList.add("active");
			s4.classList.add("active");
			s5.classList.add("active");
			s6.classList.add("active");
			s7.classList.add("active");
			break;
		case 9:
        case "9":
			s1.classList.add("active");
			s3.classList.add("active");
			s4.classList.add("active");
			s5.classList.add("active");
			s6.classList.add("active");
			s7.classList.add("active");
			break;
        case "-":
            s4.classList.add("active");
            break;
        default:
            s1.classList.add("active");
			s2.classList.add("active");
            s3.classList.add("active");
			s4.classList.add("active");
            s5.classList.add("active");
	};
};

function writeNumbers(){
    clearScreen();
    drawDigits();
    drawCommas();


    if(numbersOnScreen !== undefined){
        if(numWithoutComma().length <= 10){
            for(let i = 0; i < numWithoutComma().length; i++){
                writeDigit(i, numWithoutComma()[i]);
            };
        } else {
            writeDigit(0, 0);
        };
    };
};

function numWithoutComma(){
    let withoutComma = "";
    for(let i = 0; i < numbersOnScreen.length; i++){
        if(!numbersOnScreen[i].includes(".")){
            withoutComma += numbersOnScreen[i];
        }
    }
    return withoutComma;
}


/*debugging*/
function debug(){
    console.log(numbersOnScreen + "\n" + operator + "\n" + operand)
};