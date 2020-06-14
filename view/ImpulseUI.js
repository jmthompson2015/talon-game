const { ReactUtilities: RU } = ReactComponent;

const impulseLetter = (phase) => {
  let answer;

  if (phase && phase.key.startsWith("impulse")) {
    answer = R.last(phase.key);
  }

  return answer;
};

const cellClass1 = "b--black ba bg-dark-blue f2 tc v-mid white";
const cellClass2 = "ba bg-lightest-blue f5 pa1 tc w-100";
const cellClass3 = "b--black ba bg-dark-gray f5 mid-gray pa1 tc w-100";
const cellClass4 = "ba bg-yellow center f7 pa1 tc";

const createInitiativePlayerTable = () => {
  const cell0 = RU.createCell("Initiative", "initiativeCell");
  const cell1 = RU.createCell("Player", "playerCell");
  const rows = [
    RU.createRow(cell0, "initiativeRow"),
    RU.createRow(cell1, "playerRow"),
  ];

  return RU.createTable(rows, "initiativeTable");
};

const createNumberCell = (phase, number) => {
  let answer;

  if (phase.numbers.includes(number)) {
    answer = RU.createCell(number, `col${number}`, cellClass2);
  } else {
    answer = RU.createCell(number, `col${number}`, cellClass3);
  }

  return answer;
};

const createNumberTable = (phase) => {
  const cells0 = [
    createNumberCell(phase, 1),
    createNumberCell(phase, 2),
    createNumberCell(phase, 3),
  ];
  const cells1 = [
    createNumberCell(phase, 4),
    createNumberCell(phase, 5),
    createNumberCell(phase, 6),
  ];
  const rows = [
    RU.createFlexbox(cells0, "topRow"),
    RU.createFlexbox(cells1, "bottomRow"),
  ];

  return ReactDOMFactories.div({ key: "numberTable" }, rows);
};

const createSecondPlayerTable = () => {
  const cell0 = RU.createCell("Second", "secondCell");
  const cell1 = RU.createCell("Player", "playerCell");
  const rows = [
    RU.createRow(cell0, "secondRow"),
    RU.createRow(cell1, "playerRow"),
  ];

  return RU.createTable(rows);
};

const createTopTable = (phase) => {
  const numberTable = createNumberTable(phase);
  const cells = [
    RU.createCell(impulseLetter(phase), "phaseLabel", cellClass1),
    RU.createCell(numberTable, "numberCell"),
  ];
  const topRow = RU.createRow(cells, "topRow", "w-100");

  return RU.createTable(topRow, "topTable", "w-100");
};

const createBottomTable = () => {
  const initiativePlayerTable = createInitiativePlayerTable();
  const secondPlayerTable = createSecondPlayerTable();
  const playerCells = [
    RU.createCell(initiativePlayerTable, "initiativeCell", cellClass4),
    RU.createCell(secondPlayerTable, "secondCell", cellClass4),
  ];
  const bottomRow = RU.createRow(playerCells);

  return RU.createTable(bottomRow, "bottomTable", "w-100");
};

// /////////////////////////////////////////////////////////////////////////////
class ImpulseUI extends React.PureComponent {
  render() {
    const { customKey, phase } = this.props;

    const topTable = createTopTable(phase);
    const bottomTable = createBottomTable();

    const cell0 = RU.createCell(topTable, "topCell", "w-100");
    const cell1 = RU.createCell(bottomTable, "bottomCell", "w-100");
    const rows = [
      RU.createRow(cell0, "topRow", "w-100"),
      RU.createRow(cell1, "bottomRow", "w-100"),
    ];

    return RU.createTable(rows, customKey, "bg-pink w-100");
  }
}

ImpulseUI.propTypes = {
  phase: PropTypes.shape().isRequired,

  customKey: PropTypes.string,
};

ImpulseUI.defaultProps = {
  customKey: "impulsePanel",
};

export default ImpulseUI;
