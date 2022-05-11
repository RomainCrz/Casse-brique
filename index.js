const barre = document.querySelector(".barre");
const app = document.querySelector(".app");
const container = document.querySelector(".container");
const brique_container = document.querySelector(".brique_container");
console.log(brique_container);
const balle = document.querySelector(".balle");
const briques = document.querySelectorAll(".brique");
let briqueTab = [];

let ballRadius = 10;
let ballDx = 2;
let ballDy = -2;
let currentPositionTop = 360;
let currentPositionLeft = 400;

let barreWidth = barre.offsetWidth;
let barreHeight = barre.offsetHeight;
let barreLeft;
let barreBottom;

briquesCreation();
balle.style.setProperty("--topBalle", "360px");
balle.style.setProperty("--leftBalle", "400px");

container.addEventListener("mousemove", (e) => {
  if (e.offsetX >= 0 && e.offsetX <= 740) {
    barreLeft = e.offsetX;
    barre.style.setProperty("--left", e.offsetX + "px");
  }
});

container.addEventListener("click", (e) => {
  let interval = setInterval(() => {
    moveBall();
    checkCollisionBarre();
    checkCollision();
    Fin();
  }, 10);
});

function moveBall() {
  if (currentPositionTop <= 0) {
    ballDy = -ballDy;
  } else if (currentPositionTop >= 400) {
    ballDy = -ballDy;
  }

  if (currentPositionLeft >= 800) {
    ballDx = -ballDx;
  } else if (currentPositionLeft <= 0) {
    ballDx = -ballDx;
  }
  currentPositionLeft += ballDx;
  currentPositionTop += ballDy;
  balle.style.setProperty("--topBalle", currentPositionTop + "px");
  balle.style.setProperty("--leftBalle", currentPositionLeft + "px");
}

function checkCollisionBarre() {
  if (
    currentPositionLeft >= barreLeft &&
    currentPositionLeft <= barreLeft + barreWidth &&
    currentPositionTop <= 390 &&
    currentPositionTop >= 384
  ) {
    ballDy = -ballDy;
    currentPositionTop += ballDy;
    balle.style.setProperty("--topBalle", currentPositionTop + "px");
    if (
      currentPositionLeft >= barreLeft &&
      currentPositionLeft <= barreLeft + barreWidth / 2
    ) {
      if (ballDx > 0) {
        ballDx = -ballDx;
      }
      currentPositionLeft += ballDx;
      balle.style.setProperty("--leftBalle", currentPositionLeft + "px");
    } else if (
      currentPositionLeft >= barreLeft + barreWidth / 2 &&
      currentPositionLeft <= barreLeft + barreWidth
    ) {
      if (ballDx < 0) {
        ballDx = -ballDx;
      }
      currentPositionLeft += ballDx;
      balle.style.setProperty("--leftBalle", currentPositionLeft + "px");
    }
  }
}

function checkCollision() {
  for (let i = briqueTab.length - 1; i >= 0; i--) {
    let briqueWidth = briqueTab[i].offsetWidth;
    let briqueHeight = briqueTab[i].offsetHeight;
    let briqueLeft = briqueTab[i].offsetLeft;
    let briqueTop = briqueTab[i].offsetTop;

    if (
      currentPositionLeft >= briqueLeft &&
      currentPositionLeft <= briqueLeft + briqueWidth &&
      currentPositionTop <= briqueTop + briqueHeight &&
      currentPositionTop >= briqueTop
    ) {
      console.log(briqueTab[i]);
      ballDy = -ballDy;
      currentPositionTop += ballDy;
      balle.style.setProperty("--topBalle", currentPositionTop + "px");
      brique_container.removeChild(briqueTab[i]);
      briqueTab.splice(i, 1);
    }
  }
}

function briquesCreation() {
  let x = 17;
  let y = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 7; j++) {
      createBrique(x, y);
      x = x + 110;
    }

    y = y + 32;
    x = 17;
  }
}

function createBrique(x, y) {
  let brickWidth = 100;
  let brickHeight = 22;
  let brickMargin = 10;

  let numberBrickPerLine = 5;
  let numberBrickPerColumn = 5;

  let positionX = x;
  let positionY = y;

  let brick = document.createElement("div");
  brick.className = "brique";

  brick.style.width = brickWidth + "px";
  brick.style.height = brickHeight + "px";
  brick.style.left = positionX + "px";
  brick.style.top = positionY + "px";
  brique_container.appendChild(brick);

  positionX += brickWidth + brickMargin;

  briqueTab.push(brick);
}

function Fin() {
  if (currentPositionTop >= 400) {
    brique_container.remove();
    app.classList.add("lose");
    app.innerHTML = "<h2>PERDU ...</h2>";
  } else if (briqueTab.length == 0) {
    brique_container.remove();
    app.classList.add("win");
    app.innerHTML = "<h2>GAGNÉ !</h2>";
  }
}
