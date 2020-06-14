import ImpulseTrackUI from "./ImpulseTrackUI.js";

const element = React.createElement(ImpulseTrackUI, {
  customKey: "impulsePanel",
});

ReactDOM.render(element, document.getElementById("panel"));
