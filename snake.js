// alert("huedjnfiudisndh");
var i = "";
var cols = 10;//列数量
var rows = 10;//行数量
var snakeDirection = "up";
var keyDirection = "up";
var boxWidth = 0;
var boxHeight = 0;
var time = 1000;
var snake = [
    { x: 0, y: 2 },
    { x: 0, y: 1 },
    { x: 0, y: 0 },
];

var food = { x: 0, y: 0 };

function init() {
    for (var n = 0; n < rows; n++)//y
    {

        for (var m = 0; m < cols; m++)//x
        {
            var id = m + "_" + (rows - 1 - n);
            i += "<div id='" + id + "' title=" + id + " style='width:" + boxWidth + "px;height:" + boxHeight + "px;' class='box'></div>";
        }
    }
    document.getElementById("view").innerHTML = i;
}



function render(bgColor) {
    for (var j = 0; j < snake.length; j++) {
        var id = snake[j].x + "_" + snake[j].y;
        document.getElementById(id).style.backgroundColor = bgColor;
    }
}

function renderFood(bgColor) {
    var id = food.x + "_" + food.y;
    document.getElementById(id).style.backgroundColor = bgColor;
}

function makeFood() {
    food.x = Math.floor(Math.random() * cols);
    food.y = Math.floor(Math.random() * rows);
    while (checkConflict()) {
        makeFood();
    }
    renderFood("#f00");

}

function checkConflict() {
    for (var j = 0; j < snake.length; j++) {
        if (food.x == snake[j].x && food.y == snake[j].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    alert("game over!");
}

function eatFood() {
    var one = { x: 0, y: 0 };
    snake.push(one);
    for (var j = snake.length - 1; j > 0; j--) {
        snake[j].x = snake[j - 1].x;
        snake[j].y = snake[j - 1].y;
    }
    snake[0].x = food.x;
    snake[0].y = food.y;
    makeFood();
}

function move(direction) {
    if (direction == "up") {
        if (food.x == snake[0].x && food.y == snake[0].y + 1) {
            eatFood();
            return true;
        }
    }
    if (direction == "down") {
        if (food.x == snake[0].x && food.y == snake[0].y - 1) {
            eatFood();
            return true;
        }
    }
    if (direction == "left") {
        if (food.x == snake[0].x - 1 && food.y == snake[0].y) {
            eatFood();
            return true;
        }
    }
    if (direction == "right") {
        if (food.x == snake[0].x + 1 && food.y == snake[0].y) {
            eatFood();
            return true;
        }
    }



    switch (direction) {
        case "up":
            for (var j = snake.length - 1; j >= 0; j--) {
                if (j == 0) {
                    snake[j].y += 1;
                    if (snake[j].y >= rows) {
                        gameOver();
                        return false;
                    }
                }
                else {
                    snake[j].x = snake[j - 1].x;
                    snake[j].y = snake[j - 1].y;
                }
            }
            break;
        case "down":
            for (var j = snake.length - 1; j >= 0; j--) {
                if (j == 0) {
                    snake[j].y -= 1;
                    if (snake[j].y < 0) {
                        gameOver();
                        return false;
                    }
                }
                else {
                    snake[j].x = snake[j - 1].x;
                    snake[j].y = snake[j - 1].y;
                }
            }
            break;
        case "left":
            for (var j = snake.length - 1; j >= 0; j--) {
                if (j == 0) {
                    snake[j].x -= 1;
                    if (snake[j].x < 0) {
                        gameOver();
                        return false;
                    }
                }
                else {
                    snake[j].x = snake[j - 1].x;
                    snake[j].y = snake[j - 1].y;
                }
            }
            break;
        case "right":
            for (var j = snake.length - 1; j >= 0; j--) {
                if (j == 0) {
                    snake[j].x += 1;
                    if (snake[j].x >= cols) {
                        gameOver();
                        return false;
                    }
                }
                else {
                    snake[j].x = snake[j - 1].x;
                    snake[j].y = snake[j - 1].y;
                }
            }
            break;
        default: break;
    }

    if (checkBoom()) {
        gameOver();
        return false;
    }
    return true;
}

function checkBoom() {
    for (var j = 1; j < snake.length; j++) {
        if (snake[0].x == snake[j].x && snake[0].y == snake[j].y) {
            return true;
        }
    }
    return false;
}

function deepCopy(old) {
    var newArray = [];
    for (var j = 0; j < old.length; j++) {
        newArray.push({
            x: old[j].x,
            y: old[j].y,
        });
    }
    return newArray;
}


function oneStep() {
    render("#eee");
    var origin = deepCopy(snake);
    if ((snakeDirection == "up" && keyDirection == "down") || (snakeDirection == "down" && keyDirection == "up"
        || snakeDirection == "left" && keyDirection == "right" || snakeDirection == "right" && keyDirection == "left")) {

    }
    else {
        snakeDirection = keyDirection;
    }
    var isOk = move(snakeDirection);
    if (!isOk) {
        snake = origin;
        render("#000");
        return;
    }
    render("#000");
    setTimeout("oneStep()", time);
}


document.onkeydown = function (event) {
    var old = keyDirection;
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 37) { // 按 Left 
        keyDirection = "left";
    }
    if (e && e.keyCode == 38) { // 按 Up 要做的事情
        keyDirection = "up";
    }
    if (e && e.keyCode == 39) { // Right 键要做的事情
        keyDirection = "right";
    }
    if (e && e.keyCode == 40) { // Down 键要做的事情
        keyDirection = "down";
    }
    console.log("e.keyCode=" + e.keyCode);
    // if (old != keyDirection) {
    //     console.log("keyDirection=" + keyDirection + ",old=" + old);
    // }
};

function start() {
    var size = document.getElementById("size_selector").value;
    var speed = document.getElementById("speed_selector").value;
    if (size == 1) {
        cols = 20;
        rows = 20;
    }
    else if (size == 2) {
        cols = 25;
        rows = 25;
    }
    boxWidth = 500 / cols - 2;
    boxHeight = 500 / rows - 2;

    if (speed == 1) {
        time = 500;
    }

    if (speed == 2) {
        time = 200;
    }

    console.log(size);
    init();
    oneStep();
    makeFood();
}