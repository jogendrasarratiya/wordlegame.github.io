const wordList = ["APPLE", "GAMES" , "MANGO", "BERRY", "MELON" ,"ROUND", "GLASS", "GRAPE"];
let secretWord = wordList[Math.floor(Math.random() * wordList.length)];

let currentGuess = "";
let currentRow = 0;
let gameOver = false;

let grid = document.querySelectorAll(".cell");
let keys = document.querySelectorAll(".key");
let status = document.querySelector(".status");

const updateGrid = () => {
    const startIndex = currentRow * 5;
    const endIndex = startIndex + 5;
    const rowCells =Array.from(grid).slice(startIndex, endIndex);
    for (let i = 0; i < 5; i++) {
        const cell = rowCells[i];
        cell.textContent = currentGuess[i] || "";
        
    }
};

const checkGuess = () => {
    if (currentGuess.length !== 5) return;
        
    const rowCells = Array.from(grid).slice(currentRow * 5, (currentRow + 1) * 5);
    const guessArr = currentGuess.split("");
    const secretArr = secretWord.split("");
    let correct = 0;

    guessArr.forEach((letter, index) => {
        if (letter === secretArr[index]) {
            rowCells[index].style.backgroundColor = "#6aaa64";
            correct++;
        } else if (secretArr.includes(letter)){
            rowCells[index].style.backgroundColor = "#c9b458";
        } else {
            rowCells[index].style.backgroundColor = "#787c7e";
        }
    });


    if (correct === 5) {
        status.textContent = "Congratulation, you guessed the word! ";
        gameOver = true;
    } else if (currentRow === 5) {
        status.textContent = `Sorry, you've used all your attempts. The word was:- ${secretWord}.`;
        gameOver = true;
    } else {
        currentRow++;
        currentGuess = "";
        updateGrid();
    }
};

const handleKeyPress = (key) => {
    if (gameOver) return;

    if (key === "ENTER") {
        checkGuess();
    } else if (key === "BACK") {
        currentGuess = currentGuess.slice(0, -1);
        updateGrid();
    } else if (currentGuess.length < 5) {
        currentGuess += key;
        updateGrid();
    }
};

keys.forEach((button) => {
    button.addEventListener("click", (e) => {
        handleKeyPress(e.target.dataset.key);
    });
});

document.addEventListener("keydown", (e) => {
    if (gameOver) return;

    const key = e.key.toUpperCase();
    if (key === "ENTER" || key === "BACK" || /^[A-Z]$/.test(key)) {
        handleKeyPress(key);
    }
});


updateGrid();