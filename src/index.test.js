import {
  calculateProposedPositions,
  calculateCollisions,
  checkValidPosition,
} from "./checkShipPositions.js";
import { establishShip } from "./establishShips.js";
import { checkGameOver } from "./shotLogic.js";

//Test calculate proposed positions function

test("Test calculate proposed positions function", () => {
  let shipType = {
    length: 4,
  };
  const result = calculateProposedPositions(shipType, 1, 1, true);
  expect(result).toEqual([
    [1, 2],
    [1, 5],
  ]);
});

test("Test calculate Collisions function", () => {
  let rows = [7, 8];
  let columns = [2, 4];
  let ship1 = {
    occupiedRows: [7, 8],
    occupiedColumns: [3, 7],
    name: "dummy1",
  };
  let ship2 = {
    occupiedRows: [2, 2],
    occupiedColumns: [1, 4],
    name: "dummy2",
  };
  let shipSelected = 
  {
    name: "selected ship"
  }
  let shipList = [ship1, ship2];
  const result = calculateCollisions(rows, columns, shipList,shipSelected);
  expect(result.doesCollide).toBeTruthy();
  expect(result.shipCollided.name).toEqual("dummy1");
});

/* test("Test calculate Collisions function", () => {
  let rows = [7, 8];
  let columns = [2, 4];
  let ship1 = {
    occupiedRows: [7, 8],
    occupiedColumns: [3, 7],
    name: "dummy1",
  };
  let ship2 = {
    occupiedRows: [2, 2],
    occupiedColumns: [1, 4],
    name: "dummy2",
  };
  let shipSelected = 
  {
    name: "selected ship"
  }
  let shipList = [ship1, ship2];
  const result = calculateCollisions(rows, columns, shipList,shipSelected);
  expect(result).toBeTruthy();
}); */

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

test("Checks the gameOver check function", () => {
  let rows = [7, 8];
  let columns = [2, 4];
  let ship1 = {
    occupiedRows: [7, 8],
    occupiedColumns: [3, 7],
    name: "dummy1",
    health: 0
  };
  let ship2 = {
    occupiedRows: [2, 2],
    occupiedColumns: [1, 4],
    name: "dummy2",
    health: 0
  };
  let shipList = [ship1, ship2];
  expect(checkGameOver(shipList)).toBeTruthy();
})