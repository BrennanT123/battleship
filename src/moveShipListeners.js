//Adds appropriate event listeners when a button is clicked on.
function moveShip(shipSelected, cell, rotateButton, instructions, shipList) {
  //Allow ability to rotate ships
  rotateButton.style.display = "block";
  //Listener for the rotate button.
  //Ship direction = true = horizontal. False = vertical.
  const rotateListener = () => {
    shipSelected.shipDirection = !shipSelected.shipDirection;
  };
  rotateButton.addEventListener("click", rotateListener);
  //Create a map to store event handlers for each element
  const eventHandlers = new Map();
  cell.forEach((element) => {
    //Define the event listeners. Enter and leave are pure visual listeners. Click is use to establish new position
    const enterCell = () => {
      element.style.backgroundColor = "blue";
    };
    const leaveCell = () => {
      element.style.backgroundColor = "rgb(0, 231, 231)";
    };
    const clickOnCell = () => {
      element.style.backgroundColor = "rgb(0, 231, 231)";
      //Get the column and row for the clicked cell
      let column = parseInt(element.style.gridColumn.split("/")[0], 10);
      let row = parseInt(element.style.gridRow, 10);

      //Check if the ship will overflow the grid
      if (checkValidPosition(row, column, shipSelected) === false) {
        instructions.textContent = "Invalid position";
        instructions.classList.add("flash-red");
        setTimeout(() => {
          instructions.classList.remove("flash-red");
        }, 300);
        return; //Exit if placement is invalid
      }

      //calculates what the new rows and columns occupied would be
      const calculatedPositions = calculateProposedPositions(
        shipSelected,
        column,
        row,
        shipSelected.shipDirection
      );
      const rows = calculatedPositions[0];
      const columns = calculatedPositions[1];

      //Checks to see if there are collisions
      if (calculateCollisions(rows, columns, shipList) === true) {
        instructions.textContent = "Invalid position";
        instructions.classList.add("flash-red");
        setTimeout(() => {
          instructions.classList.remove("flash-red");
        }, 300);
        return; //Exit if placement is invalid
      }

      instructions.textContent = `Placing ship at column: ${column}, row: ${row}`;
      instructions.classList.add("flash-green");
      setTimeout(() => {
        instructions.classList.remove("flash-green");
      }, 300);

      //Hides rotate button as the ship has now been placed
      rotateButton.style.display = "none";

      //Remove all event listeners from all cells
      cell.forEach((cellElement) => {
        const handlers = eventHandlers.get(cellElement);
        if (handlers) {
          cellElement.removeEventListener("mouseenter", handlers.enterCell);
          cellElement.removeEventListener("mouseleave", handlers.leaveCell);
          cellElement.removeEventListener("click", handlers.clickOnCell);
        }
      });
      //Clear the map of event handlers
      eventHandlers.clear();
      //Position the ship
      positionShip(rows, columns, shipSelected, shipSelected.shipDirection);
      rotateButton.removeEventListener("click", rotateListener);
      const positionButtons = document.querySelectorAll(".positionButton");
      positionButtons.forEach((button) => 
        {button.style.display = "block";})
      
      
    };

    // Store the handlers for this element in the map
    eventHandlers.set(element, { enterCell, leaveCell, clickOnCell });
    // Add event listeners to the element
    element.addEventListener("mouseenter", enterCell);
    element.addEventListener("mouseleave", leaveCell);
    element.addEventListener("click", clickOnCell);
  });
}

function checkValidPosition(row, column, shipSelected) {
  if (shipSelected.shipDirection === true) {
    if (column + shipSelected.length > 11) {
      return false; //Placement invalid for horizontal ships
    }
  } else if (shipSelected.shipDirection === false) {
    if (row + shipSelected.length > 11) {
      return false; //Placement invalid for veritcal ships
    }
  }
}

function calculateCollisions(rows, columns, shipList) {
  return shipList.some((element) => {
    console.log("old ships");
    console.log(element.occupiedRows);
    console.log(element.occupiedColumns);
    const rowsOverlap =
      rows[0] <= element.occupiedRows[1] && rows[1] >= element.occupiedRows[0];
    const columnsOverlap =
      columns[0] <= element.occupiedColumns[1] &&
      columns[1] >= element.occupiedColumns[0];
    return rowsOverlap && columnsOverlap;
  });
}
function calculateProposedPositions(shipType, column, row, direction) {
  if (direction === true) {
    const columns = [column, shipType.length + column];
    const rows = [row, row];
    return [rows, columns];
  } else if (direction === false) {
    const columns = [column, column];
    const rows = [row, row + shipType.length];
    return [rows, columns];
  }
}

function positionShip(rows, columns, shipType, direction) {
  if (direction === true) {
    shipType.shipimg.src = shipType.image;
  } else if (direction === false) {
    shipType.shipimg.src = shipType.shipImage90Deg;
  }
  shipType.shipimg.style.gridColumn = `${columns[0]}/${columns[1]}`;
  shipType.shipimg.style.gridRow = `${rows[0]}/${rows[1]}`;
  //Changes the occupied rows/columns on ship class
  shipType.occupiedRows = rows;
  shipType.occupiedColumns = columns;
  //Sets image proportions
  if (shipType.shipDirection === false) {
    shipType.shipimg.style.width = "auto";
    shipType.shipimg.style.height = "100%";
  }
  if (shipType.shipDirection === true) {
    shipType.shipimg.style.width = "100%";
    shipType.shipimg.style.height = "auto";
  }
}
/* export { moveShip,positionShip,calculateProposedPositions }; */

module.exports = {
  calculateProposedPositions,
  moveShip,
  positionShip,
  calculateCollisions,
};