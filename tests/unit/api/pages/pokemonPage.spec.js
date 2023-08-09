import { shallowMount, mount } from "@vue/test-utils";
import PokemonPage from "@/pages/PokemonPage";
import { pokemons } from "../mocks/pokemons.mock";

describe("PokemonPage pages", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  test("debe de hacer match con el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de llamar mixPokemonsArray al montar", () => {
    const mixPokemonArraySpy = jest.spyOn(
      PokemonPage.methods,
      "mixPokemonsArray"
    );
    const wrapper = shallowMount(PokemonPage);
    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  test("debe de hacer match con el snapshor cuando cargan los pokemons", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          menssage: "",
        };
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("debe de mostrar los componentes de PokemomPicture y PokemonOption", () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          menssage: "",
        };
      },
    });

    const picture = wrapper.find("pokemon-picture-stub");
    const options = wrapper.find("pokemon-options-stub");
    expect(picture.exists()).toBeTruthy();
    expect(options.exists()).toBeTruthy();

    expect(picture.attributes("pokemonid")).toBe("5");
    expect(options.attributes("pokemons")).toBeTruthy();
  });

  test("pruebas con checkAnswer", async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          menssage: "",
        };
      },
    });

    await wrapper.vm.checkAnswer(5);

    expect(wrapper.find("h2").exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBeTruthy();
    expect(wrapper.find("h2").text()).toBe(`Correcto, ${pokemons[0].name}`);

    await wrapper.vm.checkAnswer(10);

    expect(wrapper.vm.menssage).toBe(`Upss, era ${pokemons[0].name}`);
  });
});
