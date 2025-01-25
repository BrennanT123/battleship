function establishShip(name, length, image, deg90,startRow) {
  this.name = name;
  this.length = length;
  this.image = image;
  this.shipDirection = true;
  this.shipImage90Deg = deg90;
  this.startRow = startRow;
}

//Create the ship img element and set styles
function initializeShipLocations(shipType) {
    const ship = document.createElement("img");
    shipType.shipimg = ship; //Links the img with the ships class 
    ship.src = shipType.image;
    ship.alt = shipType.name;
    ship.style.gridColumn = `1 / ${shipType.length + 1}`;
    ship.style.gridRow = `${shipType.startRow}`;
    shipType.occupiedColumns = [1,shipType.length + 1];
    shipType.occupiedRows = [shipType.startRow,shipType.startRow];
    ship.style.width = "100%";
    ship.style.height = "auto";
    ship.style.objectFit = "cover";
    ship.style.position = "absolute";
    return ship;
  }

  function populateGrid(backgroundBoard,gridSize) {
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
  
      userBoard.appendChild(cell);
    }
  }


  
  
  
module.exports = {
    establishShip,
    initializeShipLocations,
    populateGrid
}
/* export {establishShip, initializeShipLocations,populateGrid}; */