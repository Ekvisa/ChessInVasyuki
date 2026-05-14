circleText = document.querySelector(".circle textPath");
for (i = 0; i < 4; i++) {
  circleText.innerHTML += circleText.innerHTML;
  i++;
}

const marquees = document.querySelectorAll(".marquee p");
marquees.forEach((m) => {
  m.innerHTML += m.innerHTML;
});
