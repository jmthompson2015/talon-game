import Arc from "../artifact/Arc.js";
import Ship from "../artifact/Ship.js";
import Team from "../artifact/Team.js";

import ActionCreator from "../state/ActionCreator.js";
import PlayerState from "../state/PlayerState.js";
import Reducer from "../state/Reducer.js";
import Selector from "../state/Selector.js";
import ShipState from "../state/ShipState.js";

import StrategyResolver from "./StrategyResolver.js";

const TestData = {};

const createPlayers = (isTwoPlayer) => {
  const player1 = PlayerState.create({
    id: 1,
    name: "Alfred",
    teamKey: Team.TALON,
  });
  const player2 = PlayerState.create({
    id: 2,
    name: "Bruce",
    teamKey: Team.TERRAN,
  });

  const answer = [player1, player2];

  if (!isTwoPlayer) {
    const player3 = PlayerState.create({
      id: 3,
      name: "Clark",
      teamKey: Team.TALON,
    });
    const player4 = PlayerState.create({
      id: 4,
      name: "Diana",
      teamKey: Team.TERRAN,
    });

    answer.push(player3, player4);
  }

  return answer;
};

const createShip = (shipId, shipKey, nameIndex, an, store) => {
  ShipState.create({ id: shipId, shipKey, nameIndex, store });
  const ship = Selector.ship(shipId, store.getState());
  store.dispatch(ActionCreator.setShip(an, shipId));
  const powerCurveIndex = Ship.defaultPowerCurveIndex(ship.shipType);
  store.dispatch(ActionCreator.setShipPowerCurveIndex(shipId, powerCurveIndex));

  // Set shields to full.
  const forEachFunction1 = (arcKey) => {
    const shieldCount = ship.shipType.shields[arcKey];
    store.dispatch(
      ActionCreator.setShipArcShieldCount(shipId, arcKey, shieldCount)
    );
  };
  R.forEach(forEachFunction1, Arc.keys());

  // Charge all weapon groups.
  const forEachIndexed = R.addIndex(R.forEach);
  const forEachFunction2 = (weaponGroup, i) => {
    store.dispatch(
      ActionCreator.setShipWeaponIndexRed(shipId, i, weaponGroup.red)
    );
    store.dispatch(
      ActionCreator.setShipWeaponIndexYellow(shipId, i, weaponGroup.yellow)
    );
  };
  forEachIndexed(forEachFunction2, ship.shipType.weaponGroups);
};

TestData.createStore = (isTwoPlayer = true) => {
  const store = Redux.createStore(Reducer.root);
  const players = createPlayers(isTwoPlayer);
  store.dispatch(ActionCreator.setPlayers(players));
  R.forEach((player) => {
    const strategy = StrategyResolver.resolve(player.strategy);
    store.dispatch(ActionCreator.setPlayerStrategy(player.id, strategy));
  }, players);

  // Talon has initiative.
  store.dispatch(ActionCreator.setInitiativePlayer(players[0].id));

  // Create ships.
  createShip(1, Ship.TERRAN_CA, 1, "a1", store);
  createShip(2, Ship.TERRAN_CA, 3, "b1", store);
  createShip(3, Ship.TALON_CA, 0, "a10", store);
  createShip(4, Ship.TALON_CA, 3, "b10", store);

  return store;
};

Object.freeze(TestData);

export default TestData;
