//gets the button with ID restartGame
const restartBtn = document.getElementById("restartGame");
// Select all divs with the class "box"
const boxes = document.querySelectorAll('.box');

let end = document.querySelector('.victoryText');

let player = "X";
let turn = 0; //0 = "X" , 1 = "O"
let countTurn = 0;

function addText() {
    // Do something when each box is clicked

    //gets the id of the clicked div ["this" refernse to the div clicked]
    const id= this.id;

    //changes the player text 
    if(turn == 0){
        this.textContent = player;
        player = "O"
        turn = 1;
    }else{
        this.textContent = player;
        player = "X"
        turn = 0;
    }

    //this removes the type of event listener here its a "click" and the function that it is calling (to disable that ability).
    //here i disapled the addtext ability 
    this.removeEventListener('click', addText);
    winCheck();
}
    
// Loop through each div and add an event listener for the "click" event
boxes.forEach(function(box) {
  box.addEventListener('click', addText);
});  



//this adds and event listener to the restartBtn button that calls the function reset
restartBtn.addEventListener('click', reset);
//this function resets the board after the button has been clicked
function reset(){
    //loops around each div
    boxes.forEach(function(box){
        //changed the text content insde the divs to be empty
        box.textContent = "";
        //re-adds the event listener on the divs
        box.addEventListener('click', addText)
        //resets player turn to X
        player = "X";
        turn = 0;
    })

    end.innerText = "";
    countTurn = 0;
}

//winning consitions array
const win = [
    [0,1,2], // Top row
    [3,4,5], // Middle row
    [6,7,8], // Bottom row
    [0,3,6], // Left column
    [1,4,7], // Middle column
    [2,5,8], // Right column
    [0,4,8], // Diagonal from top-left to bottom-right
    [2,4,6]  // Diagonal from top-right to bottom-left
];


//this function checks if a player has won 
function winCheck(){
    countTurn++; //counter for how many turns have been played
    //the for( of ) put the value of each array from win to the check var
    for(let check of win){
        const [a,b,c] = check;

        // this checks if a player won by checking the value of the divs and if "X" is in the index of one of the arrays in win then "X" has won
        if(boxes[a].textContent == "X" && boxes[b].textContent == "X" && boxes[c].textContent == "X"){
            console.log("X win");
            remListen();

            end.textContent = "X Won!"
        }else if (boxes[a].textContent == "O" && boxes[b].textContent == "O" && boxes[c].textContent == "O"){
            console.log("O win");
            remListen();

            end.textContent = "O Won!"
        }else if(countTurn == 9){ //means the board is full (no more turns)
            end.textContent = "Draw!!"
        }
    }
}
function remListen(){
    boxes.forEach(function(box){
        box.removeEventListener('click', addText);
    })
    console.log("no clickes should work");
}