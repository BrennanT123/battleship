import "./styles.css";
import Battleship from "../imgs/battleship.png";
import Destroyer from "../imgs/Destroyer.png";
import Scout from "../imgs/scout.png";
import Carrier from "../imgs/carrier.png";
import Submarine from "../imgs/submarine.png";
import Submarine90deg from "../imgs/submarine90deg.png";
import Carrier90deg from "../imgs/carrier90deg.png";
import Scout90deg from "../imgs/scout90deg.png";
import Destroyer90deg from "../imgs/Destroyer90deg.png";
import Battleship90deg from "../imgs/battleship90deg.png";
import {
  establishShip,
  initializeShipLocations,
  populateGrid,
} from "./positionShips";
import { moveShip } from "./moveShipListeners";

//initialize ship objects.
const battleShip = new establishShip(
  "BattleShip",
  4,
  Battleship,
  Battleship90deg,
  1
);
const destroyer = new establishShip(
  "Destroyer",
  3,
  Destroyer,
  Destroyer90deg,
  2
);
const carrier = new establishShip("Carrier", 5, Carrier, Carrier90deg, 3);
const submarine = new establishShip(
  "Submarine",
  3,
  Submarine,
  Submarine90deg,
  4
);
const scout = new establishShip("Scout", 2, Scout, Scout90deg, 5);

//Will be used to check what ships are alive.
let shipList = [battleShip, destroyer, carrier, submarine, scout];

//Will be used to display vital information for the game
const gameText = document.querySelector("#gameText");
const userBoard = document.querySelector("#UserBoard");

//Initializes the grid background
populateGrid("#backgroundBoard", 10);
shipList.forEach((item) =>
  userBoard.appendChild(initializeShipLocations(item))
);

//Selects all the cells on the grid. Used for visuals
const cells = document.querySelectorAll(".cell");
//Button used to rotate the ships
const rotateButton = document.querySelector("#rotate");
//Select the buttons that will be used to position each ship
const pBattleship = document.querySelector("#pbattleship");
pBattleship.addEventListener("click", () => {
  const positionButtons = document.querySelectorAll(".positionButton");
  positionButtons.forEach((button) => 
    {button.style.display = "none";})
  moveShip(battleShip, cells, rotateButton, gameText, shipList);
});

const pDestroyer = document.querySelector("#pdestroyer");
pDestroyer.addEventListener("click", () => {
  const positionButtons = document.querySelectorAll(".positionButton");
  positionButtons.forEach((button) => 
    {button.style.display = "none";})
  moveShip(destroyer, cells, rotateButton, gameText, shipList);
});

const pCarrier = document.querySelector("#pcarrier");
pCarrier.addEventListener("click", () => {
  const positionButtons = document.querySelectorAll(".positionButton");
  positionButtons.forEach((button) => 
    {button.style.display = "none";})
  moveShip(carrier, cells, rotateButton, gameText, shipList);
});

const pSubmarine = document.querySelector("#psubmarine");
pSubmarine.addEventListener("click", () => {
  const positionButtons = document.querySelectorAll(".positionButton");
  positionButtons.forEach((button) => 
    {button.style.display = "none";})
  moveShip(submarine, cells, rotateButton, gameText, shipList);
});

const pScout = document.querySelector("#pscout");
pScout.addEventListener("click", () => {
  const positionButtons = document.querySelectorAll(".positionButton");
  positionButtons.forEach((button) => 
    {button.style.display = "none";})
  moveShip(scout, cells, rotateButton, gameText, shipList);
});
