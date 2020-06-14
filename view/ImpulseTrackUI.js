import Phase from "../artifact/Phase.js";

import ImpulseUI from "./ImpulseUI.js";

const { ReactUtilities: RU } = ReactComponent;

class ImpulseTrackUI extends React.PureComponent {
  render() {
    const { customKey } = this.props;

    const phases = Phase.values().slice(0, 6);
    const mapFunction = (phase) => {
      const impulseUI = React.createElement(ImpulseUI, { phase });

      return RU.createCell(impulseUI, phase.name, "pa1");
    };
    const cells = R.map(mapFunction, phases);
    const row = RU.createRow(cells);

    return RU.createTable(row, customKey);
  }
}

ImpulseTrackUI.propTypes = {
  customKey: PropTypes.string,
};

ImpulseTrackUI.defaultProps = {
  customKey: "impulseTrackPanel",
};

export default ImpulseTrackUI;
