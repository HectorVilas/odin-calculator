let numbersOnScreen = undefined;
let operand = undefined;
let operator = undefined;
const lcd = document.querySelector(".lcd");

//moves the number to the operand after getting the result without "="
let mathDone = false;

//initializing screen
clearScreen();
drawDigits();
drawCommas() 



//numbers
const btnNumbers = document.querySelectorAll(".number");
btnNumbers.forEach(btn => {
	btn.addEventListener("click", () => drawScreen(`${btn.id[1]}`));
});

//comma
const btnComma = document.querySelector("#comma");
    btnComma.addEventListener("click", () => {
        addSingleComma()
    });
//operators
const btnDelete = document.querySelector("#delete");
btnDelete.addEventListener("click", () => {
    deleteNums();
});

//[+][-][*][/]
const btnOperators = document.querySelectorAll(".operator");
btnOperators.forEach(op => {
	op.addEventListener("click", () => ready(op.getAttribute("data-operator")));
});

//[=]
const btnEqual = document.querySelector("#equal");
btnEqual.addEventListener("click", () => {
    calculate()
});


//using the keyboard
window.addEventListener("keydown", (e) => {
    let numbers = "0123456789";
    let operators = ["+","-","*","/"];
    if(numbers.includes(e.key)){
        drawScreen(e.key);
        e.preventDefault();
    }else if(operators.includes(e.key)){
        ready(e.key);
        e.preventDefault();
    } else if(e.key == "." || e.key == ","){
        addSingleComma()
        e.preventDefault();
    } else if (e.key == "Enter"){
        calculate()
        e.preventDefault();
    } else if (e.key == "Backspace" || e.key == "Delete"){
        deleteNums()
        e.preventDefault();
    }
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
    writeComma();
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
        } else if(result == parseInt(result)){
            numbersOnScreen = result;
        } else {
            result = (parseFloat(result).toFixed(4)).toString();
            //remove unnecesary zeroes
            while(result[result.length-1] == "0"){
                result = result.split("");
                result.pop();
                result = result.join("");
            }
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
        commaSeparator.className = `comma-separator n${i}`;
        let comma = document.createElement("div");
        comma.className = `comma n${i}`;
        //removes an unnecesary comma
        if(i != 9){
            commaSeparator.appendChild(comma);
        }
        commas.appendChild(commaSeparator);
    }
    lcd.appendChild(commas);
}

//changes digit's sticks depending on a number
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
        case "0":
            [s1,s2,s3,s5,s6,s7].forEach(s => s.classList.add("active"));
			break;
        case "1":
            [s6,s7].forEach(s => s.classList.add("active"));
			break;
        case "2":
            [s2,s3,s4,s5,s6].forEach(s => s.classList.add("active"));
			break;
        case "3":
            [s3,s4,s5,s6,s7].forEach(s => s.classList.add("active"));
			break;
        case "4":
            [s1,s4,s6,s7].forEach(s => s.classList.add("active"));
			break;
        case "5":
            [s1,s3,s4,s5,s7].forEach(s => s.classList.add("active"));
			break;
        case "6":
            [s1,s2,s3,s4,s5,s7].forEach(s => s.classList.add("active"));
			break;
        case "7":
            [s3,s6,s7].forEach(s => s.classList.add("active"));
			break;
        case "8":
            [s1,s2,s3,s4,s5,s6,s7].forEach(s => s.classList.add("active"));
			break;
        case "9":
            [s1,s3,s4,s5,s6,s7].forEach(s => s.classList.add("active"));
			break;
        case "-":
            s4.classList.add("active");
            break;
        default:
            [s1,s2,s3,s4,s5].forEach(s => s.classList.add("active"));
	};
};

//write all the 10 digits without comma
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

//getting the comma position
function writeComma(){
    let commaPosition = -1;
    let found = false;

    if(numbersOnScreen !== undefined){
        let numToArr = numbersOnScreen.split("");
            numToArr.forEach(char =>{
            
            if(char != "." && !found){
                commaPosition++;
            } else {
                found = true;
            };
        });
        
        if(commaPosition >= 0 && commaPosition < 9 && found == true){
            let commaOnScreen = document.querySelector(`.comma.n${commaPosition}`);
            commaOnScreen.classList.add("active");
        }
    }
};

//removes the comma from the numbers, visible in other div
function numWithoutComma(){
    let withoutComma = "";
    for(let i = 0; i < numbersOnScreen.length; i++){
        if(!numbersOnScreen[i].includes(".")){
            withoutComma += numbersOnScreen[i];
        }
    }
    return withoutComma;
}

function addSingleComma(){
    if(numbersOnScreen !== undefined && !numbersOnScreen.includes(`.`)){
        drawScreen(`.`);
    }
}

function deleteNums(){
    numbersOnScreen = undefined;
    operand = undefined;
    operator = undefined;
    drawScreen(undefined);
}

//writes operands and operator on console
function debug(){
    console.log(numbersOnScreen + "\n" + operator + "\n" + operand)
};