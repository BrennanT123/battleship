import { calculateProposedPositions, moveShip, positionShip, calculateCollisions, orinetateShipImage,checkValidPosition } from "./checkShipPositions"
import { generateRandomCoords } from "./computerShips";

function takeShot(lastShot,userShipList,instructions,userGrid,computerGrid,computerShipList) {
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
      //Get the column and row for the clicked cell
      let column = parseInt(element.style.gridColumn.split("/")[0], 10);
      let row = parseInt(element.style.gridRow, 10);
      element.style.filter = "none";
      checkShot([row,column],computerShipList,instructions,element);
      

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
      nextTurn(computerShot,lastShot,userShipList,instructions,userGrid,computerGrid,computerShipList);
    };


    // Store the handlers for this element in the map
    eventHandlers.set(element, { enterCell, leaveCell, clickOnCell });
    // Add event listeners to the element
    element.addEventListener("mouseenter", enterCell);
    element.addEventListener("mouseleave", leaveCell);
    element.addEventListener("click", clickOnCell);
   
  });
  

}

function computerShot(lastShot,userShipList,instructions,userGrid,computerGrid,computerShipList)
{

  const hitCell = document.createElement("div");
  console.log(lastShot.didHit);
  console.log("COMPUTER TURN");

    //Last shot is if the computer has recenlty hit a shit and not sunk it. 
    //If true, the computer will use basic logic to try to sink the ship.
    if(lastShot.didHit === false)
    {
        const generatedCoords = generateRandomCoords();
        const selectedRow = generatedCoords[0];
        const selectedColumn = generatedCoords[1];

      
        const newHit = checkShot(generatedCoords,userShipList,instructions,hitCell);
        userGrid.appendChild(hitCell);
        lastShot.didHit = newHit; //Stores value for true or false based on if it was hit

    }else if(lastShot.didHit === true)
    {
      console.log("no logic here yet");
    }

    setTimeout(() => nextTurn(takeShot,lastShot,userShipList,instructions,userGrid,computerGrid,computerShipList),2000)
}


function checkShot(coords,shipList,instructions,element)
{
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
      console.log(calculatedPositions)
      element.style.gridColumn = `${columns[0]}/${columns[1]}`;
      element.style.gridRow = `${rows[0]}/${rows[1]}`;

      const didCollide = calculateCollisions(rows, columns, shipList, cannonBall);
      //Checks to see if there are collisions
      if ((didCollide.doesCollide) === true) {
        instructions.textContent = "HIT!";
        instructions.classList.add("flash-red");
        setTimeout(() => {
          instructions.classList.remove("flash-red");
          instructions.textContent = " ";
        }, 1000);


        element.style.backgroundColor = "rgb(231, 0, 0)";
        return true;
      }else{

        instructions.textContent = "MISS";
        instructions.classList.add("flash-green");
        setTimeout(() => {
          instructions.classList.remove("flash-green");
          instructions.textContent = " ";
        }, 1000);
        element.style.backgroundColor = "rgb(54, 231, 0)";
        return false;
      }


}
function nextTurn(nextUp, lastShot, userShipList, instructions, userGrid, computerGrid, computerShipList) {
  const nextTurnButton = document.querySelector("#nextTurn");
  nextTurnButton.style.display = "block";
  function handleClick() {
    //Hide the button
    nextTurnButton.style.display = "none";
    //Call next turn funciton 
    nextUp(lastShot, userShipList, instructions, userGrid, computerGrid, computerShipList);
    nextTurnButton.removeEventListener("click", handleClick);
  }
  nextTurnButton.addEventListener("click", handleClick);
}
export { takeShot, checkShot, computerShot,nextTurn };

