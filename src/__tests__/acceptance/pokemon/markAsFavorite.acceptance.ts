import {Client, expect} from '@loopback/testlab';
import {Main} from '../../../application';
import {MongoDataSource} from '../../../datasources';
import {
  MONGODB_CONFIG,
  testingNonPersistedPokemonId,
  testingPokemons
} from '../../fixtures';
import {setupApplication} from '../test-helper';
import {PokemonRepository} from './../../../repositories';

describe('[CONTROLLERS] - Pokemon - /pokemons/markAsFavorite/{id}', () => {
  const [selectedPokemon] = testingPokemons;

  let app: Main;
  let client: Client;
  let pokemonRepository: PokemonRepository;

  before(async () => {
    ({app, client} = await setupApplication());
    pokemonRepository = new PokemonRepository(new MongoDataSource(MONGODB_CONFIG));
  });

  after(async () => {
    await pokemonRepository.updateAll({ favorite: false });
    await app.stop();
  })

  it('marks the selected pokemon as favorite', async () => {
    const pokemonId = selectedPokemon._id;
    await client
      .put(`/pokemons/markAsFavorite/${pokemonId}`)
      .expect(204);

    const { favorite } = await pokemonRepository.findById(pokemonId);
    expect(favorite).to.true();
  });

  it('returns BAD_REQUEST (400) when the pokemon id is longer that allowed', async () => {
    const pokemonId = selectedPokemon._id.concat('123');
    await client
      .put(`/pokemons/markAsFavorite/${pokemonId}`)
      .expect(400)
      .then();
  });

  it('returns BAD_REQUEST (400) when the pokemon id is shorter that allowed', async () => {
    const pokemonId = selectedPokemon._id.substring(1);
    await client
      .put(`/pokemons/markAsFavorite/${pokemonId}`)
      .expect(400)
      .then();
  });

  it('returns BAD_REQUEST (400) when the pokemon id has not allowed character', async () => {
    const pokemonId = selectedPokemon._id.substring(2).concat('AB');
    await client
      .put(`/pokemons/markAsFavorite/${pokemonId}`)
      .expect(400)
      .then();
  });

  it('returns NOT_FOUND (404) when a not persisted id is provided', async () => {
    const pokemonId = testingNonPersistedPokemonId;
    await client
      .put(`/pokemons/markAsFavorite/${pokemonId}`)
      .expect(404)
      .then();
  });
});
