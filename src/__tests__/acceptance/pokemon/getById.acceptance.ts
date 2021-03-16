import {Client, expect} from '@loopback/testlab';
import {
  testingNonPersistedPokemonId, testingPokemons
} from '../../fixtures';
import {setupApplication} from '../test-helper';
import {Main} from './../../../application';
import {Pokemon} from './../../../models/pokemon/pokemon.model';

describe('[CONTROLLERS] - Pokemon - /pokemons/{id}', () => {
  const [selectedPokemon] = testingPokemons;

  let app: Main;
  let client: Client;

  before(async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  })

  it('returns the required pokemon by its id', async () => {
    const pokemonId = selectedPokemon._id;
    await client
      .get(`/pokemons/${pokemonId}`)
      .expect(200)
      .then(({ body }) => {
        const retrievedPokemon: Pokemon = body;
        expect(retrievedPokemon.id).to.eql(pokemonId);
      });
  });

  it('returns BAD_REQUEST (400) when the pokemon id is longer that allowed', async () => {
    const pokemonId = selectedPokemon._id.concat('123');
    await client
      .get(`/pokemons/${pokemonId}`)
      .expect(400)
      .then();
  });

  it('returns BAD_REQUEST (400) when the pokemon id is shorter that allowed', async () => {
    const pokemonId = selectedPokemon._id.substring(1);
    await client
      .get(`/pokemons/${pokemonId}`)
      .expect(400)
      .then();
  });

  it('returns BAD_REQUEST (400) when the pokemon id has not allowed character', async () => {
    const pokemonId = selectedPokemon._id.substring(2).concat('AB');
    await client
      .get(`/pokemons/${pokemonId}`)
      .expect(400)
      .then();
  });

  it('returns NOT_FOUND (404) when a not persisted id is provided', async () => {
    const pokemonId = testingNonPersistedPokemonId;
    await client
      .get(`/pokemons/${pokemonId}`)
      .expect(404)
      .then();
  });
});
