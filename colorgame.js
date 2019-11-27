var squares = document.querySelectorAll(".square");
var colors = generateColor(9);
var responseDisplay = document.querySelector("#response");
var correctColor = pickRandomColor();
var pickedColor;
var h1span = document.querySelector("span");
var h1 = document.querySelector("h1");
h1span.textContent = correctColor;

var correctRed = "", correctGreen = "", correctBlue = "";

var resetButton = document.getElementById("resetButton");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");
var extremeButton = document.querySelector("#extremeButton");
var impossibleButton = document.querySelector("#impossibleButton");
// 1 = easy, 2 = hard, 3 = Extreme, 4 = Impossible, initially hard
var gameMode = 3;
// initially hard, so we add selected css class to hardButton
extremeButton.classList.add("selected");


resetButton.addEventListener("click", function(){
    this.textContent = "New Color";
    responseDisplay.textContent = "";
    h1.classList.remove("selected");
    h1.classList.add("selected");
    resetGame();
});

easyButton.addEventListener("click", function(){
    gameMode = 1;
    //reset game, hide three squares on bottom
    resetGame();
    //change selected button to easyButton
    this.classList.add("selected");
    hardButton.classList.remove("selected");
    extremeButton.classList.remove("selected");
    impossibleButton.classList.remove("selected");
    adjustSquareSize();
});

hardButton.addEventListener("click", function(){
    gameMode = 2;
    //reset game, hide three squares on bottom
    resetGame();
    //change selected button to easyButton
    this.classList.add("selected");
    easyButton.classList.remove("selected");
    extremeButton.classList.remove("selected");
    impossibleButton.classList.remove("selected");
    adjustSquareSize();
});

extremeButton.addEventListener("click", function(){
    gameMode = 3;
    //reset game, hide three squares on bottom
    resetGame();
    //change selected button to easyButton
    this.classList.add("selected");
    easyButton.classList.remove("selected");
    hardButton.classList.remove("selected");
    impossibleButton.classList.remove("selected");
    adjustSquareSize();
});

impossibleButton.addEventListener("click", function(){
    gameMode = 4;
    //reset game, hide three squares on bottom
    resetGame();
    //change selected button to easyButton
    this.classList.add("selected");
    easyButton.classList.remove("selected");
    hardButton.classList.remove("selected");
    extremeButton.classList.remove("selected");
    adjustSquareSize();
});

//event listsener for squares
for(let i=0; i<squares.length; i++){
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function(){
        pickedColor = this.style.backgroundColor;
        if(pickedColor === correctColor) {
            // if right color, change all tiles to that color
            changeColorTo(correctColor);
            responseDisplay.textContent = "Correct!!";
            resetButton.textContent = "New Game";
            h1.style.backgroundColor = correctColor;
            h1.classList.remove("selected");
        }
        else {
            this.style.backgroundColor = "#232323";
            responseDisplay.textContent = "Try Again";
        }
    });
}

function adjustSquareSize() {
    if(gameMode === 3 || gameMode === 4) {
        for(let i=0; i<squares.length; i++) {
            squares[i].classList.remove("easyORhardMode_adjustSquareSize");
            squares[i].classList.add("extremeORimposssibleMode_adjustSquareSize");
        }
    }
    else {
        for(let i=0; i<squares.length; i++) {
            squares[i].classList.add("easyORhardMode_adjustSquareSize");
            squares[i].classList.remove("extremeORimposssibleMode_adjustSquareSize");
        }
    }
}

function resetGame() {
    if(gameMode === 2) {
        colors = generateColor(6);
    }
    else if(gameMode === 1) {
        colors = generateColor(3);
    }
    else {
        colors = generateColor(9);
    }
    correctColor = pickRandomColor();
    if(gameMode === 4) {
        getCorrectRGBandGenerateCloseColor();
        correctColor = pickRandomColor();
    }

    //re-assign background color to squares based on the stage level
    for(let i=0; i<squares.length; i++){
        if(i < colors.length) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        }
        else {
            squares[i].style.display = "none";
        }
    }
    h1span.textContent = correctColor;
}

function changeColorTo(color) {
    for(let i=0; i<squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickRandomColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateColor(numOfColors) {
    var array = new Array();
    var red, green, blue;
    for(let i=0; i<numOfColors; i++){
        red = Math.floor(Math.random() * 256);
        green = Math.floor(Math.random() * 256);
        blue = Math.floor(Math.random() * 256);
        array.push(stringBuilder(red, green, blue));
    }
    return array;
}

function getCorrectRGBandGenerateCloseColor() {
    var i = 4;
    for(i; i<correctColor.length; i++) {
        if(correctColor.charAt(i) !== ",") {
            correctRed += correctColor.charAt(i);
        }
        else {
            i += 2;
            break;
        }
    }
    for(i ; i<correctColor.length; i++) {
        if(correctColor.charAt(i) !== ",") {
            correctGreen += correctColor.charAt(i);
        }
        else {
            i += 2;
            break;
        }
    }
    for(i ; i<correctColor.length; i++) {
        if(correctColor.charAt(i) !== ")") {
            correctBlue += correctColor.charAt(i);
        }
        else {
            break;
        }
    }
    correctRed = Number(correctRed);
    correctGreen = Number(correctGreen);
    correctBlue = Number(correctBlue);

    colors = generateCloseColors(correctRed, correctGreen, correctBlue, 9);

    correctRed = "", correctGreen = "", correctBlue = "";
}

function generateCloseColors(r, g, b, numOfColors) {
    var array = new Array();
    for(let i=0; i<numOfColors; i++) {
        r = correctRed, g = correctGreen, b = correctBlue;
        subORadd = Math.floor(Math.random() * 2);
        if(subORadd >= 1) {
            //add
            random = Math.floor(Math.random() * 51);
        }
        else {
            //sub
            random = -(Math.floor(Math.random() * 51));
        }
        if((r+random) <= 255 && (r+random) >= 0){
            r += random;
        }
        if((g+random) <= 255 && (g+random) >= 0){
            g += random;
        }
        if((b+random) <= 255 && (b+random) >= 0){
            b += random;
        }
        array.push(stringBuilder(r, g, b));
    }
    return array;
}

function stringBuilder(r, g, b) {
    return "rgb(" +r+ ", " +g+ ", " +b+ ")";
}