class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
}



class PokemonInfo {
    constructor(species, height, weight, photo, stats) {
      this.species = species;
      this.height = height;
      this.weight = weight;
      this.photo = photo;
      this.stats = stats;
    }
  }