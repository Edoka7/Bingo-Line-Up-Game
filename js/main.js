const columns = document.querySelectorAll("[data-column]");

console.log(columns);

const eventBinds = () => {
  columns.forEach((column) => {
    column.addEventListener("mouseover", () => {
      column.classList.add("active");
    });

    column.addEventListener("mouseout", () => {
      column.classList.remove("active");
    });
  });
};

eventBinds();
