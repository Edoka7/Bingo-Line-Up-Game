const columns = document.querySelectorAll("[data-column]");
const rows = document.querySelectorAll("[data-row]");

const gameboard = [
  [rows[0], rows[1], rows[2], rows[3], rows[4], rows[5]],
  [rows[6], rows[7], rows[8], rows[9], rows[10], rows[11]],
  [rows[12], rows[13], rows[14], rows[15], rows[16], rows[17]],
  [rows[18], rows[19], rows[20], rows[21], rows[22], rows[23]],
  [rows[24], rows[25], rows[26], rows[27], rows[28], rows[29]],
  [rows[30], rows[31], rows[32], rows[33], rows[34], rows[35]],
  [rows[36], rows[37], rows[38], rows[39], rows[40], rows[41]],
];

console.log(columns);
console.log(rows);

const checkRow = (columnIndex) => {
  if (gameboard[columnIndex][5].classList.contains("active")) {
    if (gameboard[columnIndex][4].classList.contains("active")) {
      if (gameboard[columnIndex][3].classList.contains("active")) {
        if (gameboard[columnIndex][2].classList.contains("active")) {
          if (gameboard[columnIndex][1].classList.contains("active")) {
            if (gameboard[columnIndex][0].classList.contains("active")) {
              return;
            }
            gameboard[columnIndex][0].classList.add("active");
          }
          gameboard[columnIndex][1].classList.add("active");
        }
        gameboard[columnIndex][2].classList.add("active");
      }
      gameboard[columnIndex][3].classList.add("active");
    }
    gameboard[columnIndex][4].classList.add("active");
  }
  gameboard[columnIndex][5].classList.add("active");
};

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

const addChip = (e) => {
  checkRow(checkColumn(e));
};

const eventBinds = () => {
  columns.forEach((column) => {
    column.addEventListener("mouseover", () => {
      column.classList.add("active");
    });

    column.addEventListener("mouseout", () => {
      column.classList.remove("active");
    });

    column.addEventListener("click", (e) => {
      addChip(e);
    });
  });
};

eventBinds();
