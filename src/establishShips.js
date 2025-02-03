
/* const {
  calculateProposedPositions,
  positionShip,
  orinetateShipImage,
} = require("./moveShipListeners");
 */
import { calculateProposedPositions, positionShip, orinetateShipImage } from "./checkShipPositions";


function establishShip(name, length, image, deg90, startRow) {
  this.name = name;
  this.length = length;
  this.image = image;
  this.shipDirection = true;
  this.shipImage90Deg = deg90;
  this.startRow = startRow;
  this.occupiedRows = null;
  this.occupiedColumns = null;
  this.health = length;
}

//Create the ship img element and set styles
function initializeShipLocations(shipType) {
  const ship = document.createElement("img");
  shipType.shipimg = ship; //Links the img with the ships class
  ship.src = shipType.image;
  ship.alt = shipType.name;
  const calculatedPositions = calculateProposedPositions(
    shipType,
    1,
    shipType.startRow,
    shipType.shipDirection
  );
  positionShip(
    calculatedPositions[0],
    calculatedPositions[1],
    shipType,
    shipType.shipDirection
  );
  orinetateShipImage(shipType, calculatedPositions[0], calculatedPositions[1]);
  ship.style.objectFit = "cover";
  ship.style.position = "absolute";
  return ship;
}

function populateGrid(backgroundBoard, gridSize, userCell) {
  //used to initialize the grid with blank divs for appearnce
  const userBoard = document.querySelector(backgroundBoard);

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    //sets the grid row and column location
    const row = Math.floor(i / gridSize) + 1;
    const column = (i % gridSize) + 1;

    cell.style.gridColumn = column;
    cell.style.gridRow = row;
    cell.classList.add("cell");
    //If its a cell on the userboard give it one class. If its on the computer board give it a different class
    if (userCell) {
      cell.classList.add("userCell");
    } else {
      cell.classList.add("computerCell");
    }

    userBoard.appendChild(cell);
  }
}

export { establishShip, initializeShipLocations, populateGrid };

/* export {establishShip, initializeShipLocations,populateGrid}; */
