const columns = document.querySelectorAll("[data-column]");
const rows = document.querySelectorAll("[data-row]");
const resultInfo = document.querySelector(".windowWin");
const playAgainBTN = document.querySelector(".windowWin button");
const rulesBTN = document.querySelector(".rulesButton");
const restartBTN = document.querySelector(".restartButton");

let playerTurn = "red";

let redScore = 0,
  yellowScore = 0,
  drawScore = 0,
  gameScore = 0;

const gameboard = [
  [rows[0], rows[1], rows[2], rows[3], rows[4], rows[5]],
  [rows[6], rows[7], rows[8], rows[9], rows[10], rows[11]],
  [rows[12], rows[13], rows[14], rows[15], rows[16], rows[17]],
  [rows[18], rows[19], rows[20], rows[21], rows[22], rows[23]],
  [rows[24], rows[25], rows[26], rows[27], rows[28], rows[29]],
  [rows[30], rows[31], rows[32], rows[33], rows[34], rows[35]],
  [rows[36], rows[37], rows[38], rows[39], rows[40], rows[41]],
];

let gameState = [
  ["a", "b", "c", "d", "e", "f"],
  ["f", "e", "d", "c", "b", "a"],
  ["a", "b", "c", "d", "e", "f"],
  ["f", "e", "d", "c", "b", "a"],
  ["a", "b", "c", "d", "e", "f"],
  ["f", "e", "d", "c", "b", "a"],
  ["a", "b", "c", "d", "e", "f"],
];

const checkColumn = (e) => {
  if (e.currentTarget.dataset.column === "one") {
    return 0;
  } else if (e.currentTarget.dataset.column === "two") {
    return 1;
  } else if (e.currentTarget.dataset.column === "three") {
    return 2;
  } else if (e.currentTarget.dataset.column === "four") {
    return 3;
  } else if (e.currentTarget.dataset.column === "five") {
    return 4;
  } else if (e.currentTarget.dataset.column === "six") {
    return 5;
  } else if (e.currentTarget.dataset.column === "seven") {
    return 6;
  } else return null;
};

const checkRow = (columnIndex) => {
  if (gameboard[columnIndex][0].classList.contains("active")) {
    if (gameboard[columnIndex][1].classList.contains("active")) {
      if (gameboard[columnIndex][2].classList.contains("active")) {
        if (gameboard[columnIndex][3].classList.contains("active")) {
          if (gameboard[columnIndex][4].classList.contains("active")) {
            if (gameboard[columnIndex][5].classList.contains("active")) {
              return false;
            }
            return 5;
          }
          return 4;
        }
        return 3;
      }
      return 2;
    }
    return 1;
  }
  return 0;
};

const checkWin = (columnIndex, rowIndex) => {
  let result = false;

  if (
    // Columns
    (gameState[columnIndex][0] === gameState[columnIndex][1] &&
      gameState[columnIndex][1] === gameState[columnIndex][2] &&
      gameState[columnIndex][2] === gameState[columnIndex][3]) ||
    (gameState[columnIndex][1] === gameState[columnIndex][2] &&
      gameState[columnIndex][2] === gameState[columnIndex][3] &&
      gameState[columnIndex][3] === gameState[columnIndex][4]) ||
    (gameState[columnIndex][2] === gameState[columnIndex][3] &&
      gameState[columnIndex][3] === gameState[columnIndex][4] &&
      gameState[columnIndex][4] === gameState[columnIndex][5])
  ) {
    return (result = true);
  } else if (
    // Rows
    (gameState[0][rowIndex] === gameState[1][rowIndex] &&
      gameState[1][rowIndex] === gameState[2][rowIndex] &&
      gameState[2][rowIndex] === gameState[3][rowIndex]) ||
    (gameState[1][rowIndex] === gameState[2][rowIndex] &&
      gameState[2][rowIndex] === gameState[3][rowIndex] &&
      gameState[3][rowIndex] === gameState[4][rowIndex]) ||
    (gameState[2][rowIndex] === gameState[3][rowIndex] &&
      gameState[3][rowIndex] === gameState[4][rowIndex] &&
      gameState[4][rowIndex] === gameState[5][rowIndex]) ||
    (gameState[3][rowIndex] === gameState[4][rowIndex] &&
      gameState[4][rowIndex] === gameState[5][rowIndex] &&
      gameState[5][rowIndex] === gameState[6][rowIndex])
  ) {
    return (result = true);
  } else if (
    // Skews from bottom to top
    (gameState[0][2] === gameState[1][3] &&
      gameState[1][3] === gameState[2][4] &&
      gameState[2][4] === gameState[3][5]) ||
    (gameState[1][2] === gameState[2][3] &&
      gameState[2][3] === gameState[3][4] &&
      (gameState[0][1] === gameState[1][2] ||
        gameState[3][4] === gameState[4][5])) ||
    (gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2] &&
      gameState[2][2] === gameState[3][3]) ||
    (gameState[1][1] === gameState[2][2] &&
      gameState[2][2] === gameState[3][3] &&
      gameState[3][3] === gameState[4][4]) ||
    (gameState[2][2] === gameState[3][3] &&
      gameState[3][3] === gameState[4][4] &&
      gameState[4][4] === gameState[5][5]) ||
    (gameState[1][0] === gameState[2][1] &&
      gameState[2][1] === gameState[3][2] &&
      gameState[3][2] === gameState[4][3]) ||
    (gameState[2][1] === gameState[3][2] &&
      gameState[3][2] === gameState[4][3] &&
      gameState[4][3] === gameState[5][4]) ||
    (gameState[3][2] === gameState[4][3] &&
      gameState[4][3] === gameState[5][4] &&
      gameState[5][4] === gameState[6][5]) ||
    (gameState[3][1] === gameState[4][2] &&
      gameState[4][2] === gameState[5][3] &&
      (gameState[2][0] === gameState[3][1] ||
        gameState[5][3] === gameState[6][4])) ||
    (gameState[3][0] === gameState[4][1] &&
      gameState[4][1] === gameState[5][2] &&
      gameState[5][2] === gameState[6][3])
  ) {
    return (result = true);
  } else if (
    // Skews from top to bottom
    (gameState[0][3] === gameState[1][2] &&
      gameState[1][2] === gameState[2][1] &&
      gameState[2][1] === gameState[3][0]) ||
    (gameState[1][3] === gameState[2][2] &&
      gameState[2][2] === gameState[3][1] &&
      (gameState[0][4] === gameState[1][3] ||
        gameState[3][1] === gameState[4][0])) ||
    (gameState[0][5] === gameState[1][4] &&
      gameState[1][4] === gameState[2][3] &&
      gameState[2][3] === gameState[3][2]) ||
    (gameState[1][4] === gameState[2][3] &&
      gameState[2][3] === gameState[3][2] &&
      gameState[3][2] === gameState[4][1]) ||
    (gameState[2][3] === gameState[3][2] &&
      gameState[3][2] === gameState[4][1] &&
      gameState[4][1] === gameState[5][0]) ||
    (gameState[1][5] === gameState[2][4] &&
      gameState[2][4] === gameState[3][3] &&
      gameState[3][3] === gameState[4][2]) ||
    (gameState[2][4] === gameState[3][3] &&
      gameState[3][3] === gameState[4][2] &&
      gameState[4][2] === gameState[5][1]) ||
    (gameState[3][3] === gameState[4][2] &&
      gameState[4][2] === gameState[5][1] &&
      gameState[5][1] === gameState[6][0]) ||
    (gameState[3][4] === gameState[4][3] &&
      gameState[4][3] === gameState[5][2] &&
      (gameState[2][5] === gameState[3][4] ||
        gameState[5][2] === gameState[6][1])) ||
    (gameState[3][5] === gameState[4][4] &&
      gameState[4][4] === gameState[5][3] &&
      gameState[5][3] === gameState[6][2])
  ) {
    return (result = true);
  }

  setTimeout(() => {
    result = false;
  }, 10);

  return result;
};

const checkDraw = () => {
  const isDrawFunc = () => {
    return gameboard.every((column, index) => {
      return column.every((row) => {
        return row.classList.contains("active");
      });
    });
  };

  let isDraw = isDrawFunc();

  return isDraw;
};

const renderResult = (whoWin) => {
  if (whoWin === "draw") {
    document.querySelector(".windowWin p").textContent = "DRAW!";
    drawScore++;
  } else if (whoWin === "red") {
    document.querySelector(".windowWin p").textContent = "The red player won!";
    redScore++;
  } else if (whoWin === "yellow") {
    document.querySelector(".windowWin p").textContent =
      "The yellow player won!";
    yellowScore++;
  }

  gameScore++;

  renderScore();

  resultInfo.classList.add("active");
};

const renderScore = () => {
  document.querySelector(".yellowScore").textContent = yellowScore;
  document.querySelector(".redScore").textContent = redScore;
  document.querySelector(".draws").textContent = drawScore;
  document.querySelector(".games").textContent = gameScore;
};

const checkResult = (result) => {
  if (result === "draw") {
    renderResult("draw");
  } else if (result === "player") {
    if (playerTurn === "red") {
      renderResult("red");
    } else if (playerTurn === "yellow") {
      renderResult("yellow");
    }
  }
};

const playAgain = () => {
  resultInfo.classList.remove("active");

  gameState = [
    ["a", "b", "c", "d", "e", "f"],
    ["f", "e", "d", "c", "b", "a"],
    ["a", "b", "c", "d", "e", "f"],
    ["f", "e", "d", "c", "b", "a"],
    ["a", "b", "c", "d", "e", "f"],
    ["f", "e", "d", "c", "b", "a"],
    ["a", "b", "c", "d", "e", "f"],
  ];

  columns.forEach((column) => {
    column.classList.remove("active", "red", "yellow");
  });

  rows.forEach((row) => {
    removeClass(row);
  });

  playerTurn = "red";
};

const changePlayer = () => {
  if (playerTurn === "red") {
    playerTurn = "yellow";
  } else {
    playerTurn = "red";
  }
};

const addChip = (e) => {
  let columnIndex = checkColumn(e);
  let rowIndex = checkRow(columnIndex);

  gameboard[columnIndex][rowIndex].classList.add("active", playerTurn);
  gameState[columnIndex][rowIndex] = playerTurn;

  if (checkDraw()) {
    return checkResult("draw");
  } else if (checkWin(columnIndex, rowIndex)) {
    return checkResult("player");
  }

  changePlayer();
};

const removeClass = (element) => {
  element.classList.remove("active", "red", "yellow");
};

const showRules = () => {
  document.querySelector(".windowRules").classList.toggle("active");
};

const restartGame = () => {
  gameState = [
    ["a", "b", "c", "d", "e", "f"],
    ["f", "e", "d", "c", "b", "a"],
    ["a", "b", "c", "d", "e", "f"],
    ["f", "e", "d", "c", "b", "a"],
    ["a", "b", "c", "d", "e", "f"],
    ["f", "e", "d", "c", "b", "a"],
    ["a", "b", "c", "d", "e", "f"],
  ];

  columns.forEach((column) => {
    column.classList.remove("active", "red", "yellow");
  });

  rows.forEach((row) => {
    removeClass(row);
  });

  playerTurn = "red";

  redScore = 0;
  yellowScore = 0;
  drawScore = 0;
  gameScore = 0;

  renderScore();
};

const eventBinds = () => {
  columns.forEach((column) => {
    column.addEventListener("mouseover", () => {
      column.classList.add("active", playerTurn);
    });

    column.addEventListener("mouseout", () => {
      removeClass(column);
    });

    column.addEventListener("click", (e) => {
      addChip(e);
      removeClass(column);
      column.classList.add("active", playerTurn);
    });
  });

  playAgainBTN.addEventListener("click", playAgain);

  rulesBTN.addEventListener("click", showRules);
  document
    .querySelector(".windowRules button")
    .addEventListener("click", showRules);

  restartBTN.addEventListener("click", restartGame);
};

eventBinds();
