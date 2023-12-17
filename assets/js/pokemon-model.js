class Pokemon {
    number;
    name;
    type;
    types = [];
    photo;
}


class PokemonInfo {
    constructor(species, height, weight, photo, stats, types, firstType) {
      this.species = species;
      this.height = height;
      this.weight = weight;
      this.photo = photo;
      this.stats = stats;
      this.types = types;
      this.firstType = firstType;
    }
  }