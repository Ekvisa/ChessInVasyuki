console.log("hello");
const film = document.querySelector(".film");
const cards = film.querySelectorAll("article.card");
const totalCards = 5;

//Создание точек пагинации по количеству слайдов:
const pagination = document.querySelector(".pagination");
console.log(pagination);
const dots = [];
for (let i = 0; i < totalCards; i++) {
  const dot = document.createElement("button");
  dot.className = "dot";
  dot.dataset.index = i;
  //   if (i === 0) dot.classList.add("active"); //
  pagination.appendChild(dot);
  dots.push(dot);
  console.log(dot);
}
console.log(dots);

let currentIndex = 0;

const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

//Функция прокрутки слайдов:
function scrollCard() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === totalCards - 1; //блокируем стрелки, если дошли до границ

  film.style.transform = `translateX(-${currentIndex * 100}%)`; //крутим
  console.log(currentIndex);

  dots.forEach((d, i) => {
    d.classList.toggle("active", i === currentIndex); //добавит "active" тем, кто удовлетворяет условию, и удалит у остальных
  });
}

//Функции для кнопок:
prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    scrollCard();
  }
});
nextBtn.addEventListener("click", () => {
  if (currentIndex < totalCards - 1) {
    currentIndex++;
    scrollCard();
  }
});

// Клик по точкам
pagination.addEventListener("click", (e) => {
  if (e.target.classList.contains("dot")) {
    currentIndex = dots.indexOf(e.target);
    // currentIndex = parseInt(e.target.dataset.index, 10);
    scrollCard();
  }
});

// Инициализация
scrollCard();
