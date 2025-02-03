import { takeShot, computerShot,nextTurn } from "./shotLogic";
//Clears placement buttons and starts game logic
function startGame(
  instructions,
  userGrid,
  computerGrid,
  userShipList,
  computerShipList
) {
  let previousComputerShot = false;
  const pbuttons = document.querySelectorAll(".positionButton");

  pbuttons.forEach((element) => {
    element.style.display = "none";
  });
  const startButton = document.querySelector("#start");
  startButton.style.display = "none";
  instructions.textContent = "User's shot"



  //initialize object for the last computer shot 
  let computerState = 
  {
    activeTarget: null,
    initialHit: false,
    shipHit: null
  }


  //Start game loop by sending all the necesary variables to the shot logic functions
takeShot(computerState,userShipList,instructions,userGrid,computerGrid,computerShipList);



  
  
}


export { startGame };
