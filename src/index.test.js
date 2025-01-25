const { calculateProposedPositions } = require("./moveShipListeners");
const { calculateCollisions } = require("./moveShipListeners");
const { establishShip } = require("./positionShips");
const { checkValidPosition } = require("./moveShipListeners");

//Test calculate proposed positions function

test("Test calculate proposed positions function", () => {
  let shipType = {
    length: 4,
  };
  const result = calculateProposedPositions(shipType, 1, 1, true);
  expect(result).toEqual([
    [1, 1],
    [1, 5],
  ]);
});

test("Test calculate Collisions function", () => {
  let rows = [8, 8];
  let columns = [3, 5];
  let ship1 = {
    occupiedRows: [8, 8],
    occupiedColumns: [4, 8],
  };
  let ship2 = {
    occupiedRows: [2, 2],
    occupiedColumns: [1, 4],
  };
  let shipList = [ship1, ship2];
  const result = calculateCollisions(rows, columns, shipList);
  expect(result).toBeTruthy();
});


//Uses mock function
test("Tests initializeShipLocations constructor", () => {
  function initializeShipLocations(shipType) {
    shipType.occupiedColumns = [1, shipType.length + 1];
    shipType.occupiedRows = [shipType.startRow, shipType.startRow];
  }
  const battleShip = new establishShip("BattleShip", 4, 0, 0, 1);
 initializeShipLocations(battleShip);
  expect(battleShip.occupiedRows).toEqual([1, 1]);
});

test("test the check valid positon function")
{
  
}
