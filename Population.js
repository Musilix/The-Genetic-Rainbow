class popTester {
  constructor(t, m, num) {

    this.population = []; // Array to hold the current population
    this.matingPool = []; // ArrayList which we will use for our "mating pool"

    this.numGen = 0; // Number of generations
    this.finished = false; // Are we finished evolving?

    this.target = t; // Target phrase
    this.mutationRate = m; // Mutation rate

    this.perfectScore = 1;
    this.best = [];

    for (let i = 0; i < num; i++) {
      this.population[i] = new chromosome(this.target.length);
    }
    this.calcFitness();
  }

  // Fill our fitness array with a value for every member of the population
  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
    }
  }

  // Generate a mating pool
  createMatingPool() {
    // Clear the past mating pool
    this.matingPool = [];
    for (let i = 0; i < this.population.length; i++) {
      let n = floor(this.population[i].fitness * 10); // Arbitrary multiplier
      for (let j = 0; j < n; j++) {                   // and pick two random numbers
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Create a new generation
  generate() {
    // fill the new gen population with children from the mating pool
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));

      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];

      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);

      this.population[i] = child;
    }
    this.numGen++;
  }

  // find the best match member of the population pool
  findBest() {
    let worldrecord = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.best = this.population[index];
    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
  }

  isFinished() {
    return this.finished;
  }

  getGen(){
    return this.numGen;
  }

  getBest() {
    return this.best;
  }
}