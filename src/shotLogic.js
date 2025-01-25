import { calculateProposedPositions, moveShip, positionShip, calculateCollisions, orinetateShipImage,checkValidPosition } from "./moveShipListeners"
import { generateRandomCoords } from "./computerShips";

function aimShot(computerGrid,instructions,shipList) {


  const eventHandlers = new Map();
  computerGrid.forEach((element) => {
    //Define the event listeners. Enter and leave are pure visual listeners. Click is use to establish new position
    const enterCell = () => {
      element.style.backgroundColor = "rgb(0, 231, 19)";
    };
    const leaveCell = () => {
      element.style.backgroundColor = "rgb(0, 231, 231)";
    };
    const clickOnCell = () => {
      //Get the column and row for the clicked cell
      let column = parseInt(element.style.gridColumn.split("/")[0], 10);
      let row = parseInt(element.style.gridRow, 10);

      checkShot([row,column],shipList,instructions,element);
      

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
    };
    // Store the handlers for this element in the map
    eventHandlers.set(element, { enterCell, leaveCell, clickOnCell });
    // Add event listeners to the element
    element.addEventListener("mouseenter", enterCell);
    element.addEventListener("mouseleave", leaveCell);
    element.addEventListener("click", clickOnCell);


   
  });

}

function computerShot(lastShot)
{
    //Last shot is if the computer has recenlty hit a shit and not sunk it. 
    //If true, the computer will use basic logic to try to sink the ship.
    if(lastShot === false)
    {
        generatedCoords = generateRandomCoords();
        checkShot(generatedCoords,shipList,instructions,cell);
    }
    if(lastShot === true)
    {

    }
}


function checkShot(coords,shipList,instructions,element)
{
    const canonBall = {
        length: 1,
        name: "canonBall",
      };
      const calculatedPositions = calculateProposedPositions(
        canonBall,
        coords[1],
        coords[0],
        true
      );
      const rows = calculatedPositions[0];
      const columns = calculatedPositions[1];
      console.log(calculatedPositions)

      //Checks to see if there are collisions
      if (calculateCollisions(rows, columns, shipList, canonBall) === true) {
        instructions.textContent = "HIT!";
        instructions.classList.add("flash-red");
        setTimeout(() => {
          instructions.classList.remove("flash-red");
          instructions.textContent = " ";
        }, 1000);
        element.style.backgroundColor = "rgb(231, 0, 0)";
      }
}

export { aimShot, checkShot };
