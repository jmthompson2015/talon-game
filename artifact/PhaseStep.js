import Phase from "./Phase.js";
import Step from "./Step.js";

const PhaseStep = Immutable({
  impulse: Immutable([
    Step.REMOVE_SHIELD_REINFORCEMENT,
    Step.SPEND_AVAILABLE_POWER,
    Step.MOVE_SHIPS,
    Step.FIRE_WEAPONS,
    Step.REPAIR_CRITICAL_DAMAGE,
  ]),
  [Phase.POWER_PHASE]: Immutable([Step.CHARGE_WEAPON, Step.ADJUST_POWER_CURVE]),
  [Phase.REINFORCEMENT_PHASE]: Immutable([Step.REINFORCEMENT]),
  [Phase.RETREAT_PHASE]: Immutable([Step.RETREAT]),
});

Object.freeze(PhaseStep);

export default PhaseStep;
