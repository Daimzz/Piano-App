const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [];
let audio = new Audio(`tunes/a.wav`);
const playTune = (key) => {
  //В зависимости от нажатой клавиши запускаем разную мелодию
  audio.src = `tunes/${key}.wav`;
  audio.play(); //Играем мелодию
  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 170);
};

pianoKeys.forEach((key) => {
  allKeys.push(key.dataset.key); // добавляем в массив название клавиши
  //Вызываем фунцию playTune каждый раз когда нажимаем на клавишу
  key.addEventListener("click", () => playTune(key.dataset.key));
});

//При нажатии на клавиши на клавиатуре запускается данная функция и проверяет
//соответствует ли нажатая клавиша той что из списка клавиш пианино, и если да то
//запускается функция playTune c названием клавиши
const pressedKey = (e) => {
  if (allKeys.includes(e.key)) {
    playTune(e.key);
  }
};

//Функция для работы с чекбоксом при нажатии на который скрываются либо показывается текст клавиш
const showHideKeys = () => {
  pianoKeys.forEach((key) => {
    key.classList.toggle("hide");
  });
};
//По нажатию клавиши запускается функция pressedKey
document.addEventListener("keydown", pressedKey);

keysCheckbox.addEventListener("click", showHideKeys);

//При изменении ползунка звука меняетя уровень звука
volumeSlider.addEventListener("input", (e) => {
  audio.volume = volumeSlider.value;
});
