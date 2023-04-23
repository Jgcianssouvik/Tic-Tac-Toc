const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];
//let create a function to initialize the game :--

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];

    //for ui empty
    boxes.forEach((box, index) => {
        box.innerText = "";
        //for pointer cursor chages
        boxes[index].style.pointerEvents = "all";
        // one more things missing at the end filled up it -(green color remove )initialise box with css properties again

        box.classList = `box box-${index+1}`;

    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player- ${currentPlayer}`

}

initGame();




function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O"
    } else {
        currentPlayer = "X";
    }

    //UI update
    gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}


function checkGameOver() {

    let ans = "";
    winningPositions.forEach((position) => {

        //all 3 boxes should be non-empty and exacly same ijn value

        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") &&
            (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
            if (gameGrid[position[0]] === "X") {
                ans = "X";
            } else {
                ans = "O";
            }

            //disable pointer events--
            boxes.forEach((box) => {
                    box.style.pointerEvents = "none";

                })
                //now we know X / O winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

        }


    });

    // it means we have a winner

    if (ans !== "") {
        gameInfo.innerText = `Winning Player ${ans}`;
        newGameBtn.classList.add("active");
        return;
    }
    //we know no wiinner found when check there is tie

    let fillCnt = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            fillCnt++;
        }
    });


    // now if board is filled,game is try
    if (fillCnt === 9) {
        gameInfo.innerText = `Game Tied !`;
        newGameBtn.classList.add("active");
    }
}



function handleClick(index) {
    if (gameGrid[index] === "") {
        //ui chages
        boxes[index].innerText = currentPlayer;
        //my inner logic changes
        gameGrid[index] = currentPlayer;

        //for pointer cursor chages
        boxes[index].style.pointerEvents = "none";


        //swap the turn
        swapTurn();
        //for winning function call
        checkGameOver();


    }
}



boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});


window.addEventListener('click', function() {

    var audio = document.getElementById("Any name");
    audio.play();
});

newGameBtn.addEventListener("click", () => { initGame(); })