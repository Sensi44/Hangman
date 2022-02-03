// Получение рандомного слова
function getRandomWord() {
    main.words = [
        `электричество`,
        `цемент`,
        `схема`,
        `ложь`,
        `рай`,
        `ом`,
    ];
    main.word = main.words[Math.floor(Math.random() * main.words.length )];
}

// Формированиеи итогового пустого массива, выставление оставшихся букв
function genAnswerArray() {
    for (let i = 0; i < main.word.length; i++) {
        main.answerArray[i] = `_`;
    }
    main.remainingLetters = main.word.length;
}

// Ввод количества попыток
function attempts() {
    let num = prompt("Введите число попыток", '12');

    if (num === null || num === '' || num === 0) {
        main.status = 0;
    }

    $("#results").text(`Игра отменена`)

    return !isFinite(num) ? attempts() : main.try = +num;
}

// Обновляем прогресс игры
function updateGameState(guess) {
    for (let j = 0; j < main.word.length; j++) {
        if (main.answerArray[j] === guess) {
            $("#results").text(`Такая буква уже одгадана, введите другую`)

        } else if (main.word[j] === guess) {
            main.answerArray[j] = guess;
            $("#results").text(`Отгадана буква - ${guess}`)
            drawCorrectGuess(guess, j);
            main.remainingLetters--;
            main.guess = '';
        }
    }
}

// Проверка количества попыток
function checkAttempts() {
    if (main.guess !== '') {
        if (main.tempTry === main.remainingLetters) {

            drawIncorrectGuess(main.guess, main.incorrectCount);
            main.incorrectCount++;
            main.try--;

            main.guess = '';
            if (main.try === 0) {
                $("#results").text(`Вы проиграли, было загадано слово "${main.word}"!`)
                for (let i = 0; i <= 7; i++) {
                    drawSegment(i)
                }
                main.status = 0;
            }
        }
    }

}

// Проверка условий победы
function checkWin() {
    if (main.remainingLetters === 0) {
        $("#results").text(`Вы победили, было загадано слово "${main.word}"!`)
        main.status = 0;
    }
}


// Обработка клавиш управления игрой
function addKey(str) {
    main.guess = str;
    $(`#${str}`).hide(500)
}

function restartKeyboard() {
    let x = [`Й`,`Ц`,`У`,`К`,`Е`,`Н`,`Г`,`Ш`,`Щ`,`З`,`Х`,`Ъ`,
        `Ф`,`Ы`,`В`,`А`,`П`,`Р`,`О`,`Л`,`Д`,`Ж`,`Э`,
        `Я`,`Ч`,`С`,`М`,`И`,`Т`,`Ь`,`Б`,`Ю`]
    for (let str of x) {
        $(`#${str}`).fadeIn(800).slideDown(1500)
    }

}

function start() {
    q.clearRect(0, 0, width, height)

    getRandomWord();
    console.log(main.word)
    genAnswerArray();
    attempts();
    main.incorrectCount = 0;
    drawField();

    restartKeyboard();

    $("#results").text(`Игра началась, введите букву`)
    q.clearRect(0, 0, width, height);
    if (main.status === 0) {
        main.status = 1;
        tick()
    }
}
function stop() {
    main.status = 0;
    $("#results").text(`Игра завершена, нажмите "Старт"`)
}

// Отрисовка в канвасе

let showTry = function () {
    q.clearRect(0, 0, 300, 100)
    drawUnderscores(main.word.length);
    q.font = "20px Courier";
    (main.try <= 6) ? q.fillStyle = "Red" : q.fillStyle = "Black";
    q.stroke();
    q.textAlign = "left";
    q.textBaseline = "top";
    q.fillText(`Попытки:${main.try}`, 15, 15)
    q.fillStyle = "Black"
}
let drawSegment = function (incorrectGuesses) {
    q.lineWidth = 5;
    switch (incorrectGuesses) {

        case 6:
            q.strokeRect(290, 320, 20, 20);
            break;
        case 5:
            q.beginPath();
            q.moveTo(300, 340);
            q.lineTo(300, 380);
            q.stroke();
            break;
        case 4:
            q.beginPath();
            q.moveTo(300, 380);
            q.lineTo(280, 410);
            q.stroke();
            break;
        case 3:
            q.beginPath();
            q.moveTo(300, 380);
            q.lineTo(320, 410);
            q.stroke();
            break;
        case 2:
            q.beginPath();
            q.moveTo(300, 360);
            q.lineTo(280, 350);
            q.stroke();
            break;
        case 1:
            q.beginPath();
            q.moveTo(300, 360);
            q.lineTo(320, 350);
            q.stroke();
            break;
        case 0:
            q.lineWidth = 3;
            q.beginPath();
            q.moveTo(287, 300);
            q.lineTo(287, 341);
            q.stroke();
            break;
    }
};
let drawField = function() {
    q.strokeRect(20, 80, width - 90, 150)
    q.beginPath();
    q.moveTo(140, 440);
    q.lineTo(100, 480);
    q.moveTo(140, 440);
    q.lineTo(180, 480);
    q.moveTo(140, 440);
    q.lineTo(140, 300);
    q.moveTo(139, 300);
    q.lineTo(289, 300);
    q.stroke();
}
let drawCorrectGuess = function (guess, index) {
    q.font = "30px Comic Sans MS";
    q.fillText(guess.toUpperCase(), (index * 35) + 40, 150);
};
let drawUnderscores = function (howMany) {
    q.lineWidth = 4;
    q.strokeStyle = "Black";
    q.beginPath();
    for (let i = 0; i < howMany; i++) {
        q.moveTo((i * 35) + 38, 180);
        q.lineTo((i * 35) + 64, 180);
    }
    q.stroke();
};
let drawIncorrectGuess = function (guess, index) {
    q.font = "30px Sans bold";
    q.textAlign = "center";
    q.textBaseline = "middle";
    q.lineWidth = 0.5;
    q.fillText(guess.toUpperCase(), 567, (index * 30) + 40);
    q.moveTo(542, (index * 30) + 40);
    q.lineTo(584, (index * 30) + 40);
    q.stroke();
};
