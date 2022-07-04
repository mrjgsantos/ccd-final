//ADAPTADO

class Population {
  constructor(popSize = 4) {
    this.pop = [];
    this.popSize = popSize;
    this.generations;
    this.newGeneration = [];
  }

  initialize() {
    for (let i = 0; i < this.popSize; i++) {
      const nTorres = round(random(2, 50));

      let individual = []; // TODO: object
      for (let x = 0; x < nTorres; x++) {
        const nAndares = round(random(2, maxAndares));

        //const nAndares = 5;
        // const s = round(5 + Math.random() * 10);
        const s = round(5 + Math.random() * 10);
        const randomPosX = round(random(0, width));
        const tower = {
          scale: s,
          floor: nAndares,
          maxFloors: maxAndares,
          floors: new Array(maxAndares).fill(null),
        };

        // const torre = new Torre(x, scale, nAndares);
        for (let y = 0; y < nAndares; y++) {
          const base = {
            shape: random(bases),
            width: null,
            height: null,
            posX: randomPosX,
            posY: null,
          };
          // print(x);
          base.width = round(base.shape.imagem.width / tower.scale);
          base.height = round(base.shape.imagem.height / tower.scale);
          base.posY = height - (y + 1) * base.height;

          const door = {
            shape: random(portas),
            width: null,
            height: null,
            posX: null,
            posY: null,
          };

          door.width = round(door.shape.imagem.width / tower.scale);
          const availableWidth =
            base.width - (door.shape.imagem.width / tower.scale) * 2;
          door.height = round(door.shape.imagem.height / tower.scale);
          door.posX = door.width + (availableWidth / 20) * round(random(19.4));
          door.posY = height - base.height * y - door.height;

          const window = {
            shape: random(janelas),
            width: null,
            height: null,
            pos: [],
          };

          window.width = round(window.shape.imagem.width / tower.scale);
          window.height = round(window.shape.imagem.height / tower.scale);
          window.pos = [
            {
              posX: 1 * (base.width / 19),
              posY: height - (y + 1) * base.height + (1 * base.height) / 19,
            },
            {
              posX: 7 * (base.width / 19),
              posY: height - (y + 1) * base.height + (1 * base.height) / 19,
            },
            {
              posX: 13 * (base.width / 19),
              posY: height - (y + 1) * base.height + (1 * base.height) / 19,
            },
            {
              posX: 1 * (base.width / 19),
              posY: height - (y + 1) * base.height + (7 * base.height) / 19,
            },
            {
              posX: 7 * (base.width / 19),
              posY: height - (y + 1) * base.height + (7 * base.height) / 19,
            },
            {
              posX: 13 * (base.width / 19),
              posY: height - (y + 1) * base.height + (7 * base.height) / 19,
            },
          ];

          const roof = {
            shape: random(telhados),
            width: null,
            height: null,
          };

          roof.width = round(roof.shape.imagem.width / tower.scale);
          roof.height = round(roof.shape.imagem.height / tower.scale);

          tower.floors[y] = new Andar(base, door, window, roof);
        }
        individual.push(tower);
        individual.length;
      }
      const ind = new Individual(individual, 0);
      ind.ready = true;
      this.pop.push(ind);
    }
    this.generations = 0;
  }

  getIndividual(i) {
    return this.pop[i];
  }

  //----------------------------------------------ADICIONADO
  async evolve() {
    for (let ind of this.pop) {
      ind.ready = false;
    }

    // Create a new a array to store the individuals that will be in the next generation
    //let newGeneration = [];

    // Sort individuals it y fitness
    await this.sortIndividualsByFitness();
    console.log("sort population by fitness");

    // Copy the elite to the next generation

    for (let i = 0; i < eliteSize; i++) {
      this.newGeneration[i] = await this.pop[i].getCopy(i);
      //print(newGeneration[i]);
    }

    // Create (breed) new individuals with crossover
    for (let i = eliteSize; i < this.pop.length; i++) {
      if (random(1) <= crossoverRate) {
        console.log(`sel offspring ${i}`);
        let parent1 = await this.tournamentSelection();
        let parent2 = await this.tournamentSelection();
        let child = await parent1.crossover(parent2);
        this.newGeneration[i] = child;
        console.log(`new child ${i}: ${child.genotype}`);
      } else {
        this.newGeneration[i] = await this.tournamentSelection().getCopy();
        console.log(`new child ${i}: ${this.newGeneration[i].genotype}`);
      }
    }

    // Mutate new individuals
    for (let i = eliteSize; i < this.newGeneration.length; i++) {
      await this.newGeneration[i].mutation();
      console.log(`mutate child ${i}`);
    }
    // Replace the individuals in the population with the new generation individuals
    this.pop = this.newGeneration;

    // Reset the fitness of all individuals to 0, excluding elite
    for (let i = 0; i < this.pop.length; i++) {
      await this.pop[i].setFitness(0);
      this.pop[i].ready = true;
      console.log(`set fitness ${i}`);
    }
    // Increment the number of generations
    console.log(`end of generation ${this.generations}`);
    this.generations++;
  }

  //----------------------------------------------ADICIONADO
  tournamentSelection() {
    let tournament = [];
    for (let i = 0; i < tournamentSize; i++) {
      let randomIndex = int(random(0, this.pop.length));
      tournament[i] = this.pop[randomIndex];
    }
    let fittest = tournament[0];
    for (let i = 0; i < tournamentSize; i++) {
      if (tournament[i].getFitness() < fittest.getFitness()) {
        fittest = tournament[i];
      }
    }
    return fittest;
  }
  //----------------------------------------------ADICIONADO
  sortIndividualsByFitness() {
    this.pop.sort((a, b) => b.getFitness() - a.getFitness());
  }
  //----------------------------------------------ADICIONADO
  getNewGeneration() {
    return this.newGeneration;
  }
  getGenerationNumber() {
    return this.generations;
  }
}
