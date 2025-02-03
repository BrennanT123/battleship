import {
  calculateProposedPositions,
  moveShip,
  positionShip,
  calculateCollisions,
  orinetateShipImage,
  checkValidPosition,
} from "./checkShipPositions";
import { generateRandomCoords } from "./computerShips";
import { establishGame } from "./index";
import { redCells, initializeComputerShips } from "./computerShips";

function takeShot(
  computerState,
  userShipList,
  instructions,
  userGrid,
  computerGrid,
  computerShipList
) {
  const eventHandlers = new Map();
  computerGrid.forEach((element) => {
    //Define the event listeners. Enter and leave are pure visual listeners. Click is use to establish new position
    const enterCell = () => {
      element.style.filter = "invert(100)";
    };
    const leaveCell = () => {
      element.style.filter = "none";
    };
    const clickOnCell = () => {
      if (element.classList.contains("alreadySelected")) {
        instructions.textContent = "Cannot select square";
        return;
      }
      //Get the column and row for the clicked cell
      let column = parseInt(element.style.gridColumn.split("/")[0], 10);
      let row = parseInt(element.style.gridRow, 10);
      element.style.filter = "none";
      element.classList.add("alreadySelected");
      checkShot([row, column], computerShipList, instructions, element);


      computerGrid.forEach((cellElement) => {
        const handlers = eventHandlers.get(cellElement);
        if (handlers) {
          cellElement.removeEventListener("mouseenter", handlers.enterCell);
          cellElement.removeEventListener("mouseleave", handlers.leaveCell);
          cellElement.removeEventListener("click", handlers.clickOnCell);
        }
      });
      //Clear the map of event handlers
      eventHandlers.clear();

            if (checkGameOver(computerShipList) === true) {
        instructions.textContent = "Game Over";
        gameOver(  
          computerState,
          userShipList,
          instructions,
          userGrid,
          computerGrid,
          computerShipList);
        return;
      }

      nextTurn(
        computerShot,
        computerState,
        userShipList,
        instructions,
        userGrid,
        computerGrid,
        computerShipList
      );
  
    };

    // Store the handlers for this element in the map
    eventHandlers.set(element, { enterCell, leaveCell, clickOnCell });
    // Add event listeners to the element
    element.addEventListener("mouseenter", enterCell);
    element.addEventListener("mouseleave", leaveCell);
    element.addEventListener("click", clickOnCell);
  });
}

function computerShot(
  computerState,
  userShipList,
  instructions,
  userGrid,
  computerGrid,
  computerShipList
) {
  const hitCell = document.createElement("div");
  hitCell.classList.add("selected");
  console.log(computerState.didHit);
  console.log("COMPUTER TURN");

  //Last shot is if the computer has recenlty hit a shit and not sunk it.
  //If true, the computer will use basic logic to try to sink the ship.
  if (!computerState.activeTarget) {
    const generatedCoords = generateRandomCoords();
    const selectedRow = generatedCoords[0];
    const selectedColumn = generatedCoords[1];

    const newHit = checkShot(
      generatedCoords,
      userShipList,
      instructions,
      hitCell
    );


    userGrid.appendChild(hitCell);

    if (newHit.doesCollide === true) {
      ///modifies active target if hit
      //Placeholder to add computer logic
    }

    if (checkGameOver(userShipList) === true) {
      instructions.textContent = "Game Over";
      gameOver(
        computerState,
        userShipList,
        instructions,
        userGrid,
        computerGrid,
        computerShipList
      );
      return;
    }


    setTimeout(
      () =>
        nextTurn(
          takeShot,
          computerState,
          userShipList,
          instructions,
          userGrid,
          computerGrid,
          computerShipList
        ),
      2000
    );


  }

}

//Function intended to be used to add computer logic
/* function setComputerTarget(shot,computerState)
{
  if(!computerState.activeTarget)
  {
    computerState.activeTarget={
    initialHit: shot,
    direction: null
    };
  }else{
    computerState.activeTarget = 
  }
} */

function checkShot(coords, shipList, instructions, element) {
  const cannonBall = {
    length: 1,
    name: "cannonBall",
  };
  const calculatedPositions = calculateProposedPositions(
    cannonBall,
    coords[1],
    coords[0],
    true
  );
  const rows = calculatedPositions[0];
  const columns = calculatedPositions[1];
  console.log(calculatedPositions);
  element.style.gridColumn = `${columns[0]}/${columns[1]}`;
  element.style.gridRow = `${rows[0]}/${rows[1]}`;

  const didCollide = calculateCollisions(rows, columns, shipList, cannonBall);
  //Checks to see if there are collisions
  if (didCollide.doesCollide === true) {
    instructions.textContent = "HIT!";
    instructions.classList.add("flash-red");
    didCollide.shipCollided.health = didCollide.shipCollided.health - 1;
    setTimeout(() => {
      instructions.classList.remove("flash-red");
      instructions.textContent = " ";
      if (didCollide.shipCollided.health === 0) {
        instructions.textContent = `${didCollide.shipCollided.name} sunk`;
      }
    }, 1000);

    console.log(shipList);
    element.style.backgroundColor = "rgb(231, 0, 0)";

    return didCollide;
  } else {
    instructions.textContent = "MISS";
    instructions.classList.add("flash-green");
    setTimeout(() => {
      instructions.classList.remove("flash-green");
      instructions.textContent = " ";
    }, 1000);
    element.style.backgroundColor = "rgb(54, 231, 0)";
    return didCollide;
  }
}

function checkGameOver(shipList) {
  if (shipList.every((element) => element.health === 0)) {
    return true;
  }
}
function nextTurn(
  nextUp,
  computerState,
  userShipList,
  instructions,
  userGrid,
  computerGrid,
  computerShipList
) {
  const nextTurnButton = document.querySelector("#nextTurn");
  nextTurnButton.style.display = "block";
  function handleClick() {
    //Hide the button
    nextTurnButton.style.display = "none";
    //Call next turn funciton
    nextUp(
      computerState,
      userShipList,
      instructions,
      userGrid,
      computerGrid,
      computerShipList
    );
    nextTurnButton.removeEventListener("click", handleClick);
  }
  nextTurnButton.addEventListener("click", handleClick);
}
function gameOver(
  computerState,
  userShipList,
  instructions,
  userGrid,
  computerGrid,
  computerShipList
) {
  const playAgain = document.querySelector("#playAgain");
  playAgain.style.display = "block"

 

  function handleClick() {
    playAgain.style.display = "none";
    const startButton = document.querySelector("#start");
    startButton.style.display = "block";

    const pbuttons = document.querySelectorAll(".positionButton");
    pbuttons.forEach((element) => {
      element.style.display = "block";
    });
    userShipList.forEach((element) => {
      element.health = element.length;
    });
    computerShipList.forEach((element) => {
      element.health = element.length;
    });

    userGrid.querySelectorAll(".selected").forEach(element => element.remove());
  
    computerGrid.forEach((child) => {
      child.style.backgroundColor = "rgb(0, 231, 231)";
    });
    computerShipList.forEach((item) => initializeComputerShips(item, computerShipList));
    redCells(".computerCell", computerShipList);
  }

  playAgain.addEventListener("click", handleClick);
}
export { takeShot, checkShot, computerShot, nextTurn, checkGameOver };
