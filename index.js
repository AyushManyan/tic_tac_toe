const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newbtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,8]
];

// let create a function to intialise the game
  
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // ui ko empty krna h 
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })
    newbtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

initGame();


function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }

    // gui update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    winningPosition.forEach((position)=>{
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]]!=="") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){
            
            // check if winner is X
            if(gameGrid[position[0]] === "X")
                answer = "X";
            else
                answer = "O";
            
            // diable pointer event

            boxes.forEach((box) =>{
                box.style.pointerEvents = "none"; 
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    // if we have winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newbtn.classList.add("active"); 
        return;
    }

    // when there is tie

    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });
    // handle is filled game tie

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newbtn.classList.add("active");
    }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText =currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap kro trun ko
        swapTurn();
        // check the winner
        checkGameOver();
    }
}

boxes.forEach((box , index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })

})


newbtn.addEventListener("click",initGame);