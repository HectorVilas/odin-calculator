let numbersOnScreen = "";
const lcd = document.querySelector(".lcd");

//drawScreen(""); //cleaning screen before starting

const btnDelete = document.querySelector("#delete");
btnDelete.addEventListener("click", () => {
    numbersOnScreen = "";
    drawScreen("");
});
const btnMultiply = document.querySelector("#multiply");
const btnComma = document.querySelector("#comma");
const btnMinus = document.querySelector("#minus");
const btnPlus = document.querySelector("#plus");
const btnEqual = document.querySelector("#equal");
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

//using the keyboard
window.addEventListener("keypress", (e) => {
    let numbers = "0123456789";
    if(numbers.includes(e.key)){
        drawScreen(e.key);
    };
});

//main fuction to draw screen
function drawScreen(val){
    clearScreen();
    writeScreen(val);
};

function clearScreen(){
    while(lcd.hasChildNodes()){
        lcd.removeChild(lcd.firstChild)
    };
};

function writeScreen(val){
    let newText = document.createElement("div");
    newText.className = "numbers";
    numbersOnScreen = numbersOnScreen+val;
    newText.innerText = numbersOnScreen;
    lcd.appendChild(newText);
};