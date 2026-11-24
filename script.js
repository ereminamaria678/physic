"use strict";

const $ = (selector) => document.querySelector(selector);
const sections = [...document.querySelectorAll(".slide")];
const titles = ["Обложка", "Энергия Кыргызстана", "Как работает ГЭС", "Физика энергии", "Энергия вокруг меня", "Экономия энергии", "Вывод"];
const number = (value) => String(value).padStart(2, "0");
const visited = new Set();
let current = 0;
const menu = $("#sections");
const menuToggle = $(".menu-toggle");

menu.innerHTML = titles.map((title, index) =>
  `<button type="button" data-go="${index}"><span>${number(index + 1)}</span>${title}</button>`
).join("");

function setMenu(open) {
  menu.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", open);
}

function showSlide(index, moveFocus = true) {
  if (index < 0 || index >= sections.length) return;
  current = index;
  visited.add(index);
  sections.forEach((section, i) => { section.hidden = i !== index; });
  Array.from(menu.children).forEach((button, i) => {
    if (i === index) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
  $("#position").textContent = `${number(index + 1)} / ${number(sections.length)}`;
  $("#progress").value = visited.size;
  $("#visited").textContent = `Изучено ${visited.size} из ${sections.length}`;
  $("#prev").disabled = index === 0;
  $("#next").disabled = index === sections.length - 1;
  setMenu(false);
  $("#slides").scrollTop = 0;
  if (moveFocus) sections[index].querySelector("h1,h2").focus({ preventScroll: true });
}

menuToggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-go]");
  if (link) showSlide(Number(link.dataset.go));
});
$("#prev").addEventListener("click", () => showSlide(current - 1));
$("#next").addEventListener("click", () => showSlide(current + 1));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu.classList.contains("open")) {
    setMenu(false);
    menuToggle.focus();
  }
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
      event.target.closest?.("input, textarea, select, [contenteditable]")) return;
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    showSlide(current + (event.key === "ArrowRight" ? 1 : -1));
  }
});
showSlide(0, false);

// Original vector artwork. All images are embedded in the local presentation.
const mountainScene = `
  <path fill="#222e34" d="M0 0h680v440H0z"/>
  <circle cx="530" cy="106" r="53" fill="#e4ece1" opacity=".86"/>
  <path fill="#334954" d="M0 215L71 160l49 16L225 68l62 67 53-39 111 103 71-91 72 70 86-55v317H0z"/>
  <path fill="#597181" d="M0 241l102-48L225 68l-49 113 63-40 49 17 32-46 20-16-47 89-42 37 95-44 63 36 113-106-32 94 65-17 41 33 84-78v300H0z"/>
  <path fill="#bfd1d5" d="M176 119l49-51 39 42-28-8-12 27-19-10-24 28 11-29zm133 11 31-34 46 43-43-14-13 22-5-12zm181 26 32-48 49 49-35-18-16 17-10-15z"/>
  <path fill="#263b3b" d="M0 240l74-23 99 23 98-11 92-23 104 27 94-13 119 12v208H0z"/>
  <path fill="#28536a" d="M0 262q119-28 201-14t171 8q77-21 99-17l-56 24q-19 11 24 19t34 28q-7 15-57 33t-48 32q4 17 130 65H174q65-45 102-75t105-48q30-12-26-19t-57-18q21-15-26-13T0 307z"/>
  <path d="M8 271q106-21 189-13m61 22 41-1m144 24 18 4m-96 34-53 20m90 47 45 19m-206-8 39-33" fill="none" stroke="#58a0bc" stroke-width="2"/>
  <path fill="#6f807e" d="M301 275l70-17 65 12-63 23-70-10z"/>
  <path fill="#a3aba2" d="M301 275l72 9 63-14v11l-64 25-67-13z"/>
  <path fill="#485855" d="M373 284l63-14v11l-64 25z"/>
  <path d="M310 283l55 8m-48-10 1 11m12-10 1 12m12-11 1 13m13-12 1 13" stroke="#50605d" fill="none"/>
  <path fill="#192424" d="M0 375l82-28 117 11 77 7-66 75H0zm680-44-69 22-162 32 51 55h180z"/>
  <path fill="#314343" stroke="#829590" d="M528 367v-30l26-18 27 18v30zm22 0v-16h9v16"/>
  <path fill="#c7ff4a" d="M535 343h9v8h-9zm28 0h9v8h-9z"/>
  <path d="M50 273q115-24 246-3l79 13 69-27 48 7 62 66" fill="none" stroke="#55bceb" stroke-width="2" opacity=".45"/>
  <path class="land-flow" d="M50 273q115-24 246-3l79 13 69-27 48 7 62 66" fill="none" stroke="#c7ff4a" stroke-width="3" stroke-dasharray="6 17"/>`;

const reservoirScene = `
  <path fill="#202d34" d="M0 0h680v440H0z"/>
  <path fill="#405764" d="M0 154l104-94 70 45L266 30l70 64 69-52 66 59 78-23 131 73v289H0z"/>
  <path fill="#91abb4" d="M69 92l35-32 36 24-30-5-12 13zm151-25 46-37 41 37-41-12-16 19-13-12zm150 2 35-27 37 32-32-13-13 12z"/>
  <path fill="#304a4d" d="M0 161l84-29 78 18 57-31 83 31 91-37 97 30 106-24 84 29v292H0z"/>
  <path fill="#286780" d="M0 180q99-39 200-15t186-6q113-31 294 15v41q-142 34-197 23t-145 42q-52 29-114 10T0 300z"/>
  <path class="site-marker site-0" fill="#337e99" d="M0 206q106-40 198-17t190-7q155-31 292 11v11q-159 22-205 19t-132 37q-51 18-107 4t-236 9z"/>
  <path fill="#233838" d="M0 296q150-40 222-15t122-11q115-59 188-38l148-26v234H0z"/>
  <path fill="#1d2c2d" d="M0 359q115 5 184-28l84 6 103-35 130 16 179-61v183H0z"/>
  <path class="site-marker site-1" fill="#96a7a5" d="M350 242l124-37 31 14-126 47z"/>
  <path fill="#637875" d="M379 266l126-47-15 69-105 45z"/>
  <path fill="#79918d" d="M350 242l29 24 6 67-29-22z"/>
  <path fill="none" stroke="#9aafaa" stroke-width="2" d="M395 275l90-33m-88 45 86-33m-84 44 80-30"/>
  <path class="site-marker site-2" fill="#3486a9" d="M430 316l39-16 33 6q29 13 55 8t123-43v30q-99 51-137 48t-67-19z"/>
  <g fill="#bce9f6" font-size="17" font-family="system-ui"><text class="site-label site-0" x="45" y="235">Водохранилище</text><text class="site-label site-2" x="514" y="376">Река Нарын</text></g>
  <path d="M452 280l40 102h75" fill="none" stroke="#c7ff4a" stroke-width="2"/>
  <text class="site-label site-1" x="492" y="407" fill="#c7ff4a" font-size="17" font-family="system-ui">Плотина ГЭС</text>`;
document.querySelectorAll("[data-landscape]").forEach((figure) => {
  const isToktogul = figure.dataset.landscape === "toktogul";
  const caption = isToktogul ? "Токтогульское водохранилище и ГЭС · стилизованная иллюстрация" : "Горы Кыргызстана · от реки к электросети";
  figure.innerHTML = `<svg viewBox="0 0 680 440" preserveAspectRatio="${isToktogul ? "xMidYMid meet" : "xMidYMid slice"}" role="img" aria-label="${caption}">${isToktogul ? reservoirScene : mountainScene}</svg><figcaption>${caption}${isToktogul ? ` · <a href="https://commons.wikimedia.org/wiki/File:Toktogul_Reservoir,_Kyrgyzstan.jpg" target="_blank" rel="noopener">Фотография местности ↗</a>` : ""}</figcaption>`;
});

const parts = [
  ["Водохранилище", "Запасает воду выше турбины. Разность уровней воды создаёт напор.", 16, 28],
  ["Плотина", "Удерживает воду и создаёт перепад уровней между водохранилищем и рекой ниже станции.", 31, 22],
  ["Водовод", "Подводит воду под напором к турбине. Затем вода возвращается в реку.", 37, 59],
  ["Турбина", "Поток воды действует на лопасти и вращает рабочее колесо. Его вал передаёт вращение генератору.", 48, 78],
  ["Генератор", "Вращение ротора меняет магнитный поток через обмотки. В них возникает переменное напряжение, а в замкнутой цепи течёт ток.", 48, 46],
  ["Трансформатор", "Повышает напряжение для передачи заданной мощности при меньшем токе. Так уменьшаются потери на нагрев проводов.", 69, 53],
  ["Линии электропередачи", "Передают электроэнергию к подстанциям. Там напряжение понижают для распределения и подачи в здания.", 80, 36],
  ["Потребитель", "Получает электроэнергию через распределительную сеть. В доме приборы преобразуют её, например, в свет, тепло или движение.", 94, 57]
];

$("#hotspots").innerHTML = parts.map(([name, , x, y], index) =>
  `<button type="button" class="hotspot" data-part="${index}" aria-label="${name}" title="${name}" style="left:${x}%;top:${y}%">${index + 1}</button>`
).join("");
$("#plant-parts").innerHTML = parts.map(([name], index) =>
  `<button type="button" class="secondary" data-part="${index}">${index + 1} · ${name}</button>`
).join("");

const partButtons = [...document.querySelectorAll("[data-part]")];
function explainPart(index) {
  $("#part-title").textContent = parts[index][0];
  $("#part-text").textContent = parts[index][1];
  partButtons.forEach((button) => button.setAttribute("aria-pressed", Number(button.dataset.part) === index));
}
partButtons.forEach((button) => button.addEventListener("click", () => explainPart(Number(button.dataset.part))));
explainPart(0);

const plant = $("#plant");
const startPlant = $("#start-plant");
const stopPlant = $("#stop-plant");
const chain = [...$("#energy-chain").children];
let plantTimer;
const plantStages = [
  "Модель остановлена. Нажмите «Запустить ГЭС».",
  "Вода движется от водохранилища к водозабору.",
  "Вода под напором проходит через водовод.",
  "Поток воды вращает турбину.",
  "Вал турбины вращает ротор генератора.",
  "Генератор создаёт переменное напряжение. В подключённой цепи течёт ток.",
  "Трансформатор повышает напряжение. Сеть передаёт энергию потребителям."
];
const pausePlant = $("#pause-plant");
const stepPlant = $("#step-plant");
let stage = 0;
let playing = false;

function renderPlant() {
  plant.dataset.stage = stage;
  plant.classList.toggle("paused", !playing && stage > 0 && stage < 6);
  $("#plant-status").textContent = stage ? `Этап ${stage} из 6 · ${plantStages[stage]}` : plantStages[0];
  const active = [-1, 0, 1, 2, 2, 3, 3][stage];
  chain.forEach((item, index) => item.classList.toggle("active", index === active));
  startPlant.disabled = playing || (stage > 0 && stage < 6);
  startPlant.textContent = stage === 6 ? "Запустить заново" : "Запустить ГЭС";
  pausePlant.disabled = stage === 0 || stage === 6;
  pausePlant.textContent = playing || pausePlant.disabled ? "Пауза" : "Продолжить";
  stepPlant.disabled = playing || stage === 6;
  stopPlant.disabled = stage === 0;
}

function runPlant() {
  clearTimeout(plantTimer);
  if (stage === 6) playing = false;
  renderPlant();
  if (playing) {
    plantTimer = setTimeout(() => {
      stage += 1;
      runPlant();
    }, 1250);
  }
}
startPlant.addEventListener("click", () => {
  stage = 1;
  playing = true;
  runPlant();
  pausePlant.focus();
});
pausePlant.addEventListener("click", () => {
  playing = !playing;
  runPlant();
});
stepPlant.addEventListener("click", () => {
  stage += 1;
  runPlant();
  if (stage === 6) startPlant.focus();
});
stopPlant.addEventListener("click", () => {
  stage = 0;
  playing = false;
  runPlant();
  startPlant.focus();
});
renderPlant();

const mass = $("#mass");
const height = $("#height");
const format = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 });
function updateEnergy() {
  const m = Number(mass.value);
  const h = Number(height.value);
  const energy = m * 9.8 * h;
  $("#mass-value").value = `${format.format(m)} кг`;
  $("#height-value").value = `${format.format(h)} м`;
  mass.setAttribute("aria-valuetext", `${m} килограммов`);
  height.setAttribute("aria-valuetext", `${h} метров`);
  $("#energy-result").value = `${format.format(energy)} Дж`;
  $("#energy-fill").style.height = `${100 * energy / 980000}%`;
}
[mass, height].forEach((input) => input.addEventListener("input", updateEnergy));
updateEnergy();

const fan = `<circle cx="100" cy="63" r="43" fill="#172325" stroke="#84a3a8" stroke-width="3"/>
<circle cx="100" cy="63" r="37" fill="none" stroke="#415b60"/>
<g class="fan-rotor" fill="#55bceb">
  <path id="blade" d="M99 64Q84 47 89 35q6-10 14-4 12 11 0 30z"/>
  <use href="#blade" transform="rotate(120 100 63)"/><use href="#blade" transform="rotate(240 100 63)"/>
  <circle cx="100" cy="63" r="7" fill="#c7ff4a"/>
</g><path d="M100 107v23m-24 4h48" stroke="#84a3a8" stroke-width="5"/>`;
const kettle = `<path d="M76 36h48l9 83H65z" fill="#192629" stroke="#9cb3b5" stroke-width="3"/>
<path d="M73 77q12-5 25 0t28 0l4 40H68z" fill="#287ca0"/>
<path d="M74 50 51 43l19 34m57-25h12q21 2 15 23l-5 18q-6 10-18 11m-46-74h29m-17-1v-9m-35 105h77" fill="none" stroke="#9cb3b5" stroke-width="4"/>
<path class="heater" d="M78 112h42" stroke="#677677" stroke-width="4"/>
<g fill="#b6eaff"><circle class="bubble" cx="84" cy="103" r="4"/><circle class="bubble" cx="100" cy="99" r="5"/><circle class="bubble" cx="116" cy="106" r="3"/></g>`;
function lampArt() {
  return `<g class="lamp-rays" stroke="#c7ff4a" stroke-width="3" fill="none"><path d="M100 11V0m-35 23-12-11m82 11 12-11M49 53H35m116 0h14m-112 38 13-9m81 9-13-9"/></g>
  <path class="lamp-face" d="M85 100v-9q0-6-9-15a34 34 0 1 1 48 0q-9 9-9 15v9z" fill="#43524b" stroke="#a7b8a9" stroke-width="3"/>
  <path d="M87 104h26m-25 8h24m-20 9h16" stroke="#a7b8a9" stroke-width="4"/>`;
}
const devices = [
  ["Электрический вентилятор", fan, "Электрическая энергия → механическая энергия вращения лопастей → движение воздуха.", "Двигатель нагревается, а лопасти и поток воздуха создают звук."],
  ["Электрический чайник", kettle, "Электрическая энергия → внутренняя энергия нагревательного элемента → внутренняя энергия воды.", "При кипении в воде образуются пузырьки пара."],
  ["LED-лампа", lampArt(), "Электрическая энергия → световая и тепловая энергия.", "Часть энергии рассеивается в виде тепла в светодиодах и электронике."]
];
$("#device-cards").innerHTML = devices.map(([name, art, chainText, note], index) => `
  <article class="device-card">
    <button type="button" aria-expanded="false" aria-controls="device-${index}">
      <svg viewBox="0 0 200 145" aria-hidden="true">${art}</svg>
      <h3>${name}</h3><span>Включить прибор</span>
    </button>
    <div id="device-${index}" hidden><p><strong>${chainText}</strong></p><p>${note}</p></div>
  </article>`).join("");
document.querySelectorAll(".device-card button").forEach((button) => {
  button.addEventListener("click", () => {
    const on = button.closest("article").classList.toggle("is-on");
    button.setAttribute("aria-expanded", on);
    document.getElementById(button.getAttribute("aria-controls")).hidden = !on;
    button.querySelector("span").textContent = on ? "Выключить прибор" : "Включить прибор";
  });
});

const tips = [
  ["Выключать свет при выходе из комнаты.", "M4 5h16v14H4zM9 12h6m-3-3v6"],
  ["Использовать LED-лампы.", "M9 18v-3a6 6 0 1 1 6 0v3zM10 21h4"],
  ["Выключать электроприборы, когда они не нужны.", "M8 4v6m8-6v6M6 10h12v3a6 6 0 0 1-12 0zm6 9v3"],
  ["Использовать дневное освещение.", "M3 3h18v18H3zM12 3v18M3 12h18m-6-4 3-3"],
  ["Выключать компьютеры и проекторы после занятий.", "M3 4h18v13H3zM12 17v4m-5 0h10"]
];
$("#tips").innerHTML = tips.map(([tip, path]) =>
  `<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>${tip}</li>`
).join("");

const questions = [
  ["Выключить свет, уходя из пустого класса.", true, "Свет в пустом классе расходует электричество без пользы."],
  ["Оставить проектор включённым до утра.", false, "После занятий проектор следует выключить."],
  ["При хорошем дневном свете выключить часть светильников.", true, "Если света из окон достаточно, можно сократить искусственное освещение."],
  ["Заменить лампу накаливания на LED-лампу той же яркости.", true, "При сопоставимом световом потоке LED-лампа обычно потребляет меньше энергии."],
  ["Кипятить полный чайник, когда нужна одна чашка.", false, "Чем больше воды нагревается, тем больше энергии требуется. Соблюдайте минимальный уровень воды, указанный на чайнике."]
];
$("#choices").innerHTML = questions.map(([question], index) =>
  `<div class="choice"><label><input type="checkbox" aria-describedby="feedback-${index}">${question}</label><span id="feedback-${index}" class="feedback" hidden></span></div>`
).join("");
const choices = [...$("#choices").children];
function clearQuizFeedback() {
  $("#quiz-score").textContent = "";
  choices.forEach((choice) => { choice.querySelector(".feedback").hidden = true; });
}
$("#quiz").addEventListener("change", clearQuizFeedback);
$("#quiz").addEventListener("reset", clearQuizFeedback);
$("#quiz").addEventListener("submit", (event) => {
  event.preventDefault();
  let score = 0;
  choices.forEach((choice, index) => {
    const correct = choice.querySelector("input").checked === questions[index][1];
    const feedback = choice.querySelector(".feedback");
    score += Number(correct);
    feedback.textContent = `${correct ? "Верно." : "Проверьте выбор."} ${questions[index][2]}`;
    feedback.classList.toggle("wrong", !correct);
    feedback.hidden = false;
  });
  $("#quiz-score").textContent = score === questions.length
    ? `${score} из ${questions.length}. Все действия оценены верно!`
    : `${score} из ${questions.length} действий оценены верно. Прочитайте подсказки и попробуйте снова.`;
});

$("#closing").innerHTML = `
<svg viewBox="0 0 880 225" role="img" aria-label="Горная река, турбина, электрическая лампа и дом соединены линией энергии.">
  <path fill="#222e34" d="M0 0h880v225H0z"/>
  <path fill="#415b68" d="M0 133L83 51l44 41 53-63 89 104v35H0z"/>
  <path fill="#c3d7dc" d="M59 75l24-24 28 26-25-9-11 14zm88-7 33-39 39 46-35-19-10 15-7-13z"/>
  <path fill="#326783" d="M0 133q85-20 164 1t147-5l8 13q-49 30-141 14T0 163z"/>
  <path class="land-flow" d="M18 145q83-18 165 0t134-11h452" stroke="#c7ff4a" fill="none" stroke-width="3" stroke-dasharray="6 17"/>
  <circle cx="337" cy="134" r="54" fill="#192426" stroke="#55bceb" stroke-width="2"/>
  <circle cx="337" cy="134" r="39" fill="none" stroke="#416375" stroke-width="2"/>
  <path fill="#55bceb" d="M337 134q-29-8-18-30l18 20q7-28 30-16l-20 20q29 8 18 29l-20-17q-7 28-30 16z"/>
  <circle cx="337" cy="134" r="7" fill="#c7ff4a"/>
  <g transform="translate(474 28)">
    <path fill="#c7ff4a" opacity=".19" d="M26 0h72l28 101H0z"/>
    <g transform="translate(-18 15) scale(.8)"><path fill="#c7ff4a" d="M85 100v-9q0-6-9-15a34 34 0 1 1 48 0q-9 9-9 15v9z"/><path d="M87 105h26m-24 9h22" stroke="#9caf9f" stroke-width="5"/></g>
  </g>
  <path d="M704 168v-54l64-54 64 54v54z" fill="#273837" stroke="#a0b4ac" stroke-width="2"/>
  <path d="M694 120l74-62 74 62" fill="none" stroke="#a0b4ac" stroke-width="3"/>
  <path fill="#c7ff4a" d="M723 120h21v22h-21zm68 0h21v22h-21z"/>
  <path stroke="#a0b4ac" fill="none" d="M758 168v-35h20v35"/><g fill="none" stroke="#c7ff4a" stroke-width="2"><circle class="route-ring route-0" cx="109" cy="144" r="29"/><circle class="route-ring route-1" cx="337" cy="134" r="60"/><circle class="route-ring route-2" cx="548" cy="134" r="29"/><circle class="route-ring route-3" cx="768" cy="134" r="72"/></g>
</svg>
<figcaption>Горная река → турбина → электричество → свет в доме</figcaption>`;

const siteNotes = [
  "Водохранилище позволяет запасать воду и регулировать её подачу на турбины.",
  "Плотина удерживает воду. Разность уровней воды выше и ниже станции создаёт напор.",
  "Нарын питает водохранилище. После турбин вода возвращается в русло ниже плотины."
];
const siteButtons = [...document.querySelectorAll("[data-site]")];
function explainSite(index) {
  $("#site-note").textContent = siteNotes[index];
  $(".landscape[data-landscape='toktogul']").dataset.highlight = index;
  siteButtons.forEach((button, i) => button.setAttribute("aria-pressed", i === index));
}
siteButtons.forEach((button, i) => button.addEventListener("click", () => explainSite(i)));
explainSite(0);

const powerInputs = ["head", "flow", "efficiency"].map((id) => document.getElementById(id));
const precise = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 3 });
function updatePower() {
  const [head, flow, efficiency] = powerInputs.map((input) => Number(input.value));
  const available = 1000 * 9.8 * flow * head / 1000000;
  const useful = available * efficiency / 100;
  $("#head-value").value = `${head} м`;
  $("#flow-value").value = `${flow} м³/с`;
  $("#efficiency-value").value = `${efficiency}%`;
  $("#potential-power").value = `${precise.format(available)} МВт`;
  $("#electric-power").value = `${precise.format(useful)} МВт`;
  $("#loss-power").value = `${precise.format(available - useful)} МВт`;
  $("#power-bar").style.setProperty("--useful", `${efficiency}%`);
  $("#power-bar").classList.toggle("zero", flow === 0);
}
powerInputs.forEach((input) => input.addEventListener("input", updatePower));
updatePower();

function updateConsumption() {
  const minutes = Number($("#run-time").value);
  const watts = Number($("#load-device").value);
  $("#runtime-value").value = `${minutes} мин`;
  $("#consumption").value = `${precise.format(watts * minutes / 60000)} кВт·ч`;
}
$("#run-time").addEventListener("input", updateConsumption);
$("#load-device").addEventListener("change", updateConsumption);
updateConsumption();

const route = [
  ["Горная река", "Вода, находящаяся выше турбины, обладает запасом потенциальной энергии."],
  ["Турбина", "Поток вращает турбину. Её вал приводит в движение ротор генератора."],
  ["Свет и электрическая сеть", "Генератор преобразует механическую энергию в электрическую. Сеть передаёт её потребителям."],
  ["Дом", "В лампе часть электрической энергии превращается в свет, остальная рассеивается в виде тепла."]
];
$("#recap").innerHTML = route.map(([label], index) =>
  `<button type="button" class="secondary" data-route="${index}">${label}</button>`
).join("");
const routeButtons = [...$("#recap").children];
function showRoute(index) {
  $("#recap-note").textContent = route[index][1];
  $("#closing").dataset.highlight = index;
  routeButtons.forEach((button, i) => button.setAttribute("aria-pressed", i === index));
}
routeButtons.forEach((button, index) => button.addEventListener("click", () => showRoute(index)));
showRoute(0);

const fullscreen = $("#fullscreen");
fullscreen.hidden = !document.fullscreenEnabled;
fullscreen.addEventListener("click", async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    fullscreen.hidden = true;
  }
});
document.addEventListener("fullscreenchange", () => {
  const label = document.fullscreenElement ? "Выйти из полноэкранного режима" : "Во весь экран";
  fullscreen.title = label;
  fullscreen.setAttribute("aria-label", label);
});