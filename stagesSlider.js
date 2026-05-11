const stages = document.querySelector(".stages");
const totalCards = 5;
const prevCardBtn = document.querySelector(".transformation .prevBtn");
const nextCardBtn = document.querySelector(".transformation .nextBtn");
let cardIndex = 0;

//Создание точек пагинации по количеству слайдов:
const dotsPagination = document.querySelector(".dotsPagination");
const dots = [];
for (let i = 0; i < totalCards; i++) {
  const dot = document.createElement("button");
  dot.className = "dot";
  dotsPagination.appendChild(dot);
  dots.push(dot);
}

//Функция прокрутки слайдов:
function updateCard() {
  prevCardBtn.disabled = cardIndex === 0;
  nextCardBtn.disabled = cardIndex === totalCards - 1; //блокируем стрелки, если дошли до границ

  stages.style.transform = `translateX(-${cardIndex * 100}%)`; //крутим до нужного кадра

  dots.forEach((d, i) => {
    d.classList.toggle("active", i === cardIndex); //добавит класс тем, кто удовлетворяет условию, и удалит у остальных
  });
}

//Функции для клика по кнопкам:
prevCardBtn.addEventListener("click", () => {
  if (cardIndex > 0) {
    cardIndex--;
    updateCard();
  }
});
nextCardBtn.addEventListener("click", () => {
  if (cardIndex < totalCards - 1) {
    cardIndex++;
    updateCard();
  }
});

//Функции для клика по точкам:
dotsPagination.addEventListener("click", (e) => {
  if (e.target.classList.contains("dot")) {
    cardIndex = dots.indexOf(e.target);
    updateCard();
  }
});

//Инициализация:
updateCard();
