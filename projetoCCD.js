let eliteSize = 0;
let tournamentSize = 3;
let crossoverRate = 0.7;

let bases = [];
let janelas = [];
let telhados = [];
let portas = [];
let individuals = [];

let andares = [];
let torres = [];

let torre;
let pop;

let posXPortas = [];
let posYPortas = [];

let posJanelas = [];

let randomPorta = [];
let randomBase = [];
let randomJanela = [];
let randomTelhado = [];

let scale = [];
let randomPosX = [];

let maxAndares = 10;
let maxWidthBase = 75;
let nAndares = [];

let nTorres;
let paisagem = [];

let pg = [];
let pgAtual = 0;

const crossoverP = 0.9;
const mutatorP = 0.1;

let imgBg;
let regular, bold;
let img;

function preload() {
  loadJSON("janelas.json", loadJanelas);
  loadJSON("portas.json", loadPortas);
  loadJSON("bases.json", loadBases);
  loadJSON("telhados.json", loadTelhados);
  imgBg = loadImage("data/bg.jpg");
  regular = loadFont("data/regular.ttf");
  bold = loadFont("data/bold.ttf");
}

//Load Janelas
async function loadJanelas(data) {
  for (const janela of Object.keys(data)) {
    let img = await loadImage(data[janela]["imagePath"]);
    data[janela]["imagem"] = img;
    janelas.push(data[janela]);
  }
}

//Load Portas
async function loadPortas(data) {
  for (const porta of Object.keys(data)) {
    let img = await loadImage(data[porta]["imagePath"]);
    data[porta]["imagem"] = img;
    portas.push(data[porta]);
  }
}

//Load Bases
async function loadBases(data) {
  for (const base of Object.keys(data)) {
    let img = await loadImage(data[base]["imagePath"]);
    data[base]["imagem"] = img;
    bases.push(data[base]);
  }
}

//Load Telhados
async function loadTelhados(data) {
  for (const telhado of Object.keys(data)) {
    let img = await loadImage(data[telhado]["imagePath"]);
    data[telhado]["imagem"] = img;
    telhados.push(data[telhado]);
  }
}

function setup() {
  //  frameRate(1);
  imageMode(CORNER);
  textFont(regular);
  createCanvas(windowWidth, windowHeight);

  pop = new Population();
  pop.initialize();
  img = pop.getIndividual(pgAtual).getPhenotype();
}

function draw() {
  background(255);

  if (pop.getIndividual(pgAtual).ready !== true) return;

  image(img, 0, 0);

  /*
  for (let i = 0; i < pop.pop.length; i++) {
    pop.getIndividual(i).mutation();
  }*/

  fill(245, 245, 245, 255);
  strokeWeight(5);
  rect(-4, -4, windowWidth + 8, 100 + 8);

  textSize(30);
  fill(0);
  //print(pop.getGenerationNumber());
  text(
    "Landscape: " +
      (pgAtual + 1) +
      "    " +
      "Fitness: " +
      pop.getIndividual(pgAtual).getFitness() +
      "    " +
      "Generation: " +
      pop.getGenerationNumber(),
    50,
    60
  );

  text(
    "Change Individual: <>" +
      "    " +
      "Change Fitness: ^" +
      "    " +
      "Evolve: Enter" +
      "    " +
      "Save Image: S",
    1600,
    60
  );
}

async function keyPressed() {
  if (pgAtual < pop.pop.length - 1) {
    if (keyCode === RIGHT_ARROW) {
      pgAtual++;
      img = pop.getIndividual(pgAtual).getPhenotype();
    }
  }
  if (pgAtual > 0) {
    if (keyCode === LEFT_ARROW) {
      pgAtual--;
      img = pop.getIndividual(pgAtual).getPhenotype();
    }
  }

  if (keyCode === UP_ARROW) {
    if (pop.getIndividual(pgAtual).getFitness() < 1000) {
      let fitnessAtual = pop.getIndividual(pgAtual).getFitness();
      pop.getIndividual(pgAtual).setFitness(fitnessAtual + 100);
    }
  }

  if (keyCode === DOWN_ARROW) {
    if (pop.getIndividual(pgAtual).getFitness() > 0) {
      let fitnessAtual = pop.getIndividual(pgAtual).getFitness();
      pop.getIndividual(pgAtual).setFitness(fitnessAtual - 100);
    }
  }
  if (keyCode === ENTER) {
    await pop.evolve();
    pgAtual = 0;
  }

  if (key === "s") {
    pop.getIndividual(pgAtual).saveImage();
  }
}
