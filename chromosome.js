// Constructor (makes a random DNA)
class chromosome {
  constructor(num) {
    // The genetic sequence defining "traits"
    this.genes = [];
    this.fitness = 0;
    for (let i = 0; i < num; i++) {
      this.genes[i] = floor(random(1, 7)); // Pick from range of of 1-6
      
    }
  }

  // Fitness function (returns floating point % of "correct" characters)
  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] == target[i]) {
        score++;
      }
    }
    this.fitness = score / target.length;
  }

  crossover(partner) {
    // A new child
    let child = new chromosome(this.genes.length);

    let midpoint = floor(random(this.genes.length)); // Pick a midpoint

    //half from one, half from the other
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }

  // Based on a mutation probability, picks a new random character
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
          this.genes[i] = floor(random(1,7));
      }
    }
  }

  getGene(){
    return this.genes;
  }
}