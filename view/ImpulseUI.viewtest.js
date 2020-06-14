import Phase from "../artifact/Phase.js";
import Resolver from "../artifact/Resolver.js";

import ImpulseUI from "./ImpulseUI.js";

const phase = Resolver.phase(Phase.IMPULSE_A);
const element = React.createElement(ImpulseUI, {
  customKey: "impulsePanel",
  phase,
});

ReactDOM.render(element, document.getElementById("panel"));
