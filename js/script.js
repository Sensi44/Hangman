
let canvas = document.getElementById("canvas");
let q = canvas.getContext("2d");
let width = canvas.width;
let height = canvas.height;

const main = {
    word: 0,
    answerArray: [],
    remainingLetters: 0,
    try: 14,
    tempTry: 0,
    incorrectCount: 0,
    guess: '',
    status: 1,
};


getRandomWord();
console.log(main.word)
genAnswerArray();
setTimeout(attempts, 800);


// Основной цикл
let tick = () => {
    showTry();
    drawField();


    main.tempTry = main.remainingLetters;
    main.guess = main.guess.toLowerCase()
    updateGameState(main.guess)

    checkAttempts();
    drawSegment(main.try)
    checkWin();
    // return (main.status === 1) ? setTimeout(() => tick(), 100) : null   - раньше было так
    return (main.status === 1) ? requestAnimationFrame(tick) : null // более оптимизировано, вроде как
}
tick();





