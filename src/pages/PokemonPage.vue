<template>
  <h1>¿Quién es este Pokemon?</h1>

  <PokemonPicture :pokemonId="251" :showPokemon="true" />

  <PokemonOptions />
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture";
import PokemonOptions from "@/components/PokemonOptions";
import getPokemonOptions from "@/helpers/getPokemonOptions";

console.log(getPokemonOptions());

export default {
  components: {
    PokemonPicture,
    PokemonOptions,
  },
};
</script>
