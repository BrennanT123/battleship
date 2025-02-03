import { calculateCollisions, moveShip, positionShip,calculateProposedPositions,checkValidPosition } from "./checkShipPositions";
import { establishShip } from "./establishShips";

function initializeComputerShips(shipType,shipList)
{
    let validPositionCheck = false;
    while(validPositionCheck === false)
    {
        //Randomly generate ship position

        let findCoords = generateRandomCoords();


        let selectedRow = findCoords[0];
        let selectedColumn = findCoords[1];

        let direction = Math.random() < 0.5;
        shipType.shipDirection = direction;

        let calculatedPositions = calculateProposedPositions(shipType,selectedColumn,selectedRow,direction);

        let rows = calculatedPositions[0];
        let columns = calculatedPositions[1];
        if (checkValidPosition(rows[0], columns[0], shipType) === false) {
            continue;
          }
          if (calculateCollisions(rows, columns, shipList,shipType).doesCollide === true) {
        continue;  
        }
          validPositionCheck = true;
          positionShip(calculatedPositions[0],calculatedPositions[1],shipType);
    }
   
}

function generateRandomCoords()
{
    let selectedRow = Math.floor(Math.random()*9+1);
    let selectedColumn = Math.floor(Math.random()*9+1);
    return [selectedRow, selectedColumn];
}
//Creates computer ship objects
function establishComputerShips()
{
    const battleShip = new establishShip("Battleship",4,null,null,1);
    const destroyer = new establishShip("Destroyer",3,null,null,1);
    const carrier = new establishShip("Carrier",5,null,null,1);
    const submarine = new establishShip("Submarine",3,null,null,1);
    const scout = new establishShip("Scout",2,null,null,1);
    let shipList = [battleShip, destroyer, carrier, submarine, scout];
    
    console.log(shipList);
    shipList.forEach((item) =>
        initializeComputerShips(item,shipList)
      );
      
      redCells(".computerCell",shipList);
      

      return shipList;

}

//Temporary function to make the ship cells red so its easier to debug
function redCells(cellClass,shipList)
{

    //needed to run check collision
    const dummyShip =
    {
        name: "dummyShip",
    };

    const cells = document.querySelectorAll(cellClass);
    cells.forEach((element)=>{
        let column = parseInt(element.style.gridColumn.split("/")[0], 10);
        let row = parseInt(element.style.gridRow, 10);
        if (calculateCollisions([row,row+1], [column,column+1], shipList,dummyShip).doesCollide === true) {
            element.style.backgroundColor = "rgb(157, 212, 6)";
            }
    })




}
export {establishComputerShips, generateRandomCoords, redCells, initializeComputerShips};