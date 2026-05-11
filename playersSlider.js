// const players = document.querySelectorAll(".players li");
// const totalPlayers = players.length;

// let playerIndex = 0;

// function updatePlayer() {
//   players.forEach((p) => {
//     p.style.transform = `translateX(-${playerIndex * 100}%)`;
//   });
// }

// prevPlayerBtn.addEventListener("click", () => {
//   if (playerIndex > 0) playerIndex--;
//   else playerIndex = totalPlayers - 1;
//   updatePlayer();
// });
// nextPlayerBtn.addEventListener("click", () => {
//   if (playerIndex < totalPlayers - 1) playerIndex++;
//   else playerIndex = 0;
//   updatePlayer();
// });

// updatePlayer();

// setInterval(() => {
//   playerIndex++;

//   if (playerIndex > totalPlayers - 1) {
//     playerIndex = 0;
//   }

//   updatePlayer();
// }, 4000);

const prevPlayerBtn = document.querySelector(".participants .prevBtn");
const nextPlayerBtn = document.querySelector(".participants .nextBtn");
const track = document.querySelector(".players");
const slides = Array.from(track.querySelectorAll("li"));
const totalOriginal = slides.length;
const clonesCount = 3; //максимум видимых на десктопе

//Клонирование clonesCount первых и последних слайдов для организации бесконечной прокрутки:
const firstSlidesToClone = slides.slice(0, clonesCount);
const firstClones = firstSlidesToClone.map((s) => s.cloneNode(true));
const lastSlidesToClone = slides.slice(-clonesCount);
const lastClones = lastSlidesToClone.map((s) => s.cloneNode(true)); //создали firstClones и lastClones - массивы узлов, которые вставим по краям track

firstClones.forEach((clone) => track.appendChild(clone));
lastClones
  .reverse()
  .forEach((clone) => track.insertBefore(clone, track.firstChild)); //вставили

console.log(track);

let allSlides = track.querySelectorAll("li");
let currentIndex = clonesCount; //это первый слайд в разметке
let autoplayTimer = null;
const AUTOPLAY_DELAY = 1000;

//Функкция получения ширины одного слайда:
function getSlideWidth() {
  return allSlides[0].getBoundingClientRect().width;
}

//Функция перемещения слайдов:
function move(animate = true) {
  track.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
  track.style.transform = `translateX(-${currentIndex * getSlideWidth()}px)`;
  updatePagination();
}

//Зацикливание слайдов:
track.addEventListener("transitionend", () => {
  //когда закончился сдвиг
  if (currentIndex >= totalOriginal + clonesCount) {
    //если дошли до последнего клона
    currentIndex = clonesCount; //делаем текущим первый слайд в разметке
    move(false); //прыгаем в начало разметки
  } else if (currentIndex < clonesCount) {
    //если дошли до первого клона - аналогично
    currentIndex = totalOriginal + clonesCount - 1;
    move(false);
  }
});

// 5. Пагинация (только реальные слайды)
const pagination = document.querySelector(".numbersPagination");
activePlayerNumber = document.querySelector(".numbersPagination .active");
playersCount = document.querySelector(".numbersPagination .common");
playersCount.textContent = totalOriginal;
// pagination.textContent = `${realIndex} / ${totalOriginal}`;

function updatePagination() {
  const realIndex =
    (((currentIndex - clonesCount) % totalOriginal) + totalOriginal) %
    totalOriginal; //нормализуем индекс к диапазону [0; totalOriginal - 1]

  activePlayerNumber.textContent = realIndex + 1;
}

//Функции сдвига слайдов:
function goNext() {
  currentIndex++;
  move(true);
  resetAutoplay();
}
function goPrev() {
  currentIndex--;
  move(true);
  resetAutoplay();
}

nextPlayerBtn.addEventListener("click", goNext);
prevPlayerBtn.addEventListener("click", goPrev);

//Функции автоматичесой смены слайдов:
function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(goNext, AUTOPLAY_DELAY);
}
function stopAutoplay() {
  clearInterval(autoplayTimer);
}
function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}

document
  .querySelector(".participants .viewport")
  .addEventListener("mouseenter", stopAutoplay);
document
  .querySelector(".participants .viewport")
  .addEventListener("mouseleave", startAutoplay);

// 8. Ресайз (пересчёт позиции при изменении ширины экрана)
// let resizeTimer;
// window.addEventListener("resize", () => {
//   clearTimeout(resizeTimer);
//   resizeTimer = setTimeout(() => move(false), 150);
// });

//Инициализация:
move(false);
startAutoplay();
