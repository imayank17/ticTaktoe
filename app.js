let boxes = document.querySelectorAll(".box");  //boxes[btn1,btn2,btn3,.....,btn9];
let  msg=document.querySelector("#msg");
let msgContainer=document.querySelector(".messageContainer");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-game-btn");

let winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//accessing every box button and adding event listener to each box button in return
let turn0 = true;
boxes.forEach(function (box) {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            box.classList.add("o");
            turn0 = false;
        }
        else {
            box.innerText = "x"
            box.classList.add("x");
            turn0 = true;
        }
        //if a box has been clicked it can not be clicked again
        box.disabled = true;
        //function calling to check who is the winner
        checkWinner();
        //print winner on the UI
    

    });
});


//function to calculate winner
let isWinner=false;
function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val == pos2val && pos2val == pos3val) {
                isWinner=true;
                console.log("winner");
                showWinner(pos1val);
                highlightWinningBoxes(pattern);
                return;
            }
        }
    }
   
    if(!isWinner && [...boxes].every(box => box.innerText !== "")){
        showDraw();
    }
}
function showDraw(){
    msg.innerText="Game is Drawn";
    msgContainer.classList.remove("hide");
}
//function to display calculated winner
function showWinner(winner){
    msg.innerText=`Congratulations Player ${winner} won the game`;
    msgContainer.classList.remove("hide");
    disableBoxes();          //to disable all(actually remaining) only after winner has been printed on the console
    
}

//only run if winner is diplayed on the console
function disableBoxes(){
    for(let box of boxes ){
        box.disabled=true;
    }
}


function restartGame(){
  for(let box of boxes){
    box.disabled=false; //enable boxes
    box.innerText=""; //clearing content
    msgContainer.classList.add("hide"); //remove winner displayed message
    box.classList.remove("x", "o","highlight");
    turn0=true;
    isWinner=false;
  }
}
resetBtn.addEventListener("click",restartGame);
newGameBtn.addEventListener("click",restartGame);

//function to add highlights to the patten
function highlightWinningBoxes(pattern) {
    pattern.forEach(index => {
        boxes[index].classList.add("highlight");  // Add the highlight class
    });
}
