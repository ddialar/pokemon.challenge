import {Client, expect} from '@loopback/testlab';
import {Main} from '../../../application';
import {Pokemon} from '../../../models/pokemon/pokemon.model';
import {
  testingNonPersistedPokemonName, testingPokemons
} from '../../fixtures';
import {setupApplication} from '../test-helper';

describe('[CONTROLLERS] - Pokemon - /pokemons/name/{name}', () => {
  const [selectedPokemon] = testingPokemons;

  let app: Main;
  let client: Client;

  before(async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  })

  it('returns the required pokemon by its name', async () => {
    const pokemonName = selectedPokemon.name;
    await client
      .get(`/pokemons/name/${pokemonName}`)
      .expect(200)
      .then(({ body }) => {
        const retrievedPokemon: Pokemon = body;
        expect(retrievedPokemon.name).to.eql(pokemonName);
      });
  });

  it('returns BAD_REQUEST (400) when the pokemon name has not allowed character', async () => {
    const pokemonName = selectedPokemon.name.substring(2).concat('12');
    await client
      .get(`/pokemons/name/${pokemonName}`)
      .expect(400)
      .then();
  });

  it('returns NOT_FOUND (404) when a not persisted name is provided', async () => {
    const pokemonName = testingNonPersistedPokemonName;
    await client
      .get(`/pokemons/name/${pokemonName}`)
      .expect(404)
      .then();
  });

  it('returns BAD_REQUEST (400) when the pokemon name is not provided', async () => {
    await client
      .get(`/pokemons/name/`)
      .expect(404)
      .then();
  });
});
