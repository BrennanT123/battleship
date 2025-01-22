import "./styles.css";
import Battleship from "../imgs/battleship.png";
import Destroyer from "../imgs/Destroyer.png";
import Scout from "../imgs/scount.png";
import Carrier from "../imgs/carrier.png";
import Submarine from "../imgs/submarine.png";
//Initalize ship objects.

//Used to test if a ship is in hand. Used for repositioning the ships on the grid
let shipInHand = true;
let newPositionX = 0;
let newPositionY = 0;
function establishShip(name, length, image) {
  this.name = name;
  this.length = length;
  this.image = image;
}

const battleShip = new establishShip("BattleShip", 4, Battleship);
const destroyer = new establishShip("Destroyer", 3, Destroyer);
const carrier = new establishShip("Carrier", 5, Carrier);
const submarine = new establishShip("Submarine", 3, Submarine);
const scout = new establishShip("Scout", 2, Scout);

const gameText = document.querySelector("#gameText");



function populateGrid() {
  //used to initalize the grid with blank divs for appearnce
  const userBoard = document.querySelector("#backgroundBoard");
  const gridSize = 10; // 10x10 grid

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    //sets the grid row and column location
    const row = Math.floor(i / gridSize) + 1;
    const column = (i % gridSize) + 1;

    cell.style.gridColumn = column;
    cell.style.gridRow = row;
    cell.classList.add("cell");

    userBoard.appendChild(cell);
  }
}

function initalizeShipLocations(startRow, shipType) {
  const userBoard = document.querySelector("#UserBoard");
  const ship = document.createElement("img");
  shipType.shipimg = ship;
  ship.src = shipType.image;
  ship.alt = shipType.name;
  ship.style.gridColumn = `1 / ${shipType.length + 1}`;
  ship.style.gridRow = `${startRow}`;
  ship.style.width = "100%";
  ship.style.height = "auto";
  ship.style.objectFit = "cover";
  ship.style.position = "absolute";
  userBoard.appendChild(ship);
}

populateGrid();
initalizeShipLocations(1, battleShip);
initalizeShipLocations(2, destroyer);
initalizeShipLocations(3, carrier);
initalizeShipLocations(4, submarine);
initalizeShipLocations(5, scout);


const pBattleship = document.querySelector("#pbattleship");
pBattleship.addEventListener("click", () => moveShip(battleShip));

const pDestroyer = document.querySelector("#pdestroyer");
pDestroyer.addEventListener("click", () => moveShip(destroyer));

const pCarrier = document.querySelector("#pcarrier");
pCarrier.addEventListener("click", () => moveShip(carrier));

const pSubmarine = document.querySelector("#psubmarine");
pSubmarine.addEventListener("click", () => moveShip(submarine));

const pScout = document.querySelector("#pscout");
pScout.addEventListener("click", () => moveShip(scout));


function moveShip(shipSelected) {
  const cell = document.querySelectorAll(".cell");

  // Create a map to store event handlers for each element
  const eventHandlers = new Map();

  cell.forEach((element) => {
    // Define the event listeners
    const enterCell = () => {
      element.style.backgroundColor = "blue";
    };

    const leaveCell = () => {
      element.style.backgroundColor = "rgb(0, 231, 231)";
    };
    const clickOnCell = () => {
      element.style.backgroundColor = "rgb(0, 231, 231)";
      shipInHand = false;
      // Remove all event listeners from all cells
      cell.forEach((cellElement) => {
        const handlers = eventHandlers.get(cellElement);
        if (handlers) {
          cellElement.removeEventListener("mouseenter", handlers.enterCell);
          cellElement.removeEventListener("mouseleave", handlers.leaveCell);
          cellElement.removeEventListener("click", handlers.clickOnCell);
        }
        let column = parseInt(element.style.gridColumn.split("/")[0], 10); 
        let row = parseInt(element.style.gridRow, 10);
        console.log(`Mouse entered cell at column ${column}, row ${row}`);
        positionShip(shipSelected,column,row);
      });

      // Clear the map of event handlers
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

function positionShip(shipType,column,row)
{
  console.log(shipType.length);
  shipType.shipimg.style.gridColumn = `${column}/${shipType.length + column}`;
  shipType.shipimg.style.gridRow = `${row}/${row}`;
}