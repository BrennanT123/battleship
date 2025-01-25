import { aimShot,checkShot } from "./shotLogic";

//Clears placement buttons and starts game logic
function startGame(
  instructions,
  userGrid,
  computerGrid,
  shipList,
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

  //UserShot
 aimShot(computerGrid,instructions,computerShipList);


  setTimeout(() => {
    instructions.textContent = "Computer is taking a shot..."
  }, 3000);
  //ComputerShot
  
  
}

export { startGame };
