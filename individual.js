class Individual {
  constructor(genotype, fitness = 0) {
    this.genotype = genotype;
    this.fitness = fitness;
    this.pg = createGraphics(500, 500);
    this.ready = false;
  }

  getPhenotype() {
    this.pg = createGraphics(windowWidth, windowHeight);
    for (let x = 0; x < this.genotype.length; x++) {
      this.genotype[0].floors[0].drawOverlay(this.pg);
      for (let y = 0; y < this.genotype[x].floor; y++) {
        if (y < this.genotype[x].floor - 1) {
          this.genotype[x].floors[y].drawBase(this.pg);
          this.genotype[x].floors[y].drawJanelas(this.pg);
        }
        if (y == 0) {
          this.genotype[x].floors[y].drawPortas(this.pg);
        }

        if (y == this.genotype[x].floor - 1) {
          this.genotype[x].floors[y].drawTelhados(this.pg);
        }
      }
    }

    return this.pg;
  }
  getGenotype() {
    return this.genotype;
  }
  //----------------------------------------------ALTERADO
  async crossover(parent1) {
    return new Promise(async (resolve, reject) => {
      const child = await new Individual([...this.genotype], 0);
      let crossoverPoint = await int(random(1, this.genotype.length - 1));
      for (let i = 0; i < crossoverPoint; i++) {
        if (i < crossoverPoint) {
          child.genotype[i] = parent1.genotype[i];
        }
      }
      console.log(`— inside crossover`);
      resolve(child);
    });
  }

  checkReady() {
    let r = true;
    for (let i = 0; i < this.genotype.length; i++) {
      if (this.genotype[i] === undefined) r = false;
    }
    this.ready = r;
    return r;
  }

  //----------------------------------------------ADICIONADO
  async mutation() {
    return new Promise(async (resolve, reject) => {
      for (let x = 0; x < this.genotype.length; x++) {
        for (let y = 0; y < 10; y++) {
          //for (let y = 0; y < this.genotype[x].floor; y++) {
          if (this.genotype[x] !== null && this.genotype[x] !== undefined) {
            let nAndarRandom = await int(random(0, this.genotype[x].maxFloors));
            let andarRandom = this.genotype[x].floors[nAndarRandom];
            if (andarRandom !== undefined && andarRandom !== null) {
              let ornamentoRandom = await random([
                { var: andarRandom.base, el: bases },
                { var: andarRandom.door, el: portas },
                { var: andarRandom.roof, el: telhados },
                { var: andarRandom.window, el: janelas },
              ]);
              ornamentoRandom.var.shape = await random(ornamentoRandom.el);
            }
          }
        }
      }
      resolve(true);
      console.log(`— inside mutation`);
    });
  }

  //----------------------------------------------ADICIONADO
  setFitness(fitness) {
    this.fitness = fitness;
  }
  //----------------------------------------------ADICIONADO
  getFitness() {
    return this.fitness;
  }
  //----------------------------------------------ADICIONADO
  getCopy() {
    let copy = new Individual([...this.genotype], this.fitness);
    return copy;
  }
  saveImage() {
    save(this.pg, "paisagem", "jpg");
  }
}
