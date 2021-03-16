import {Client, expect} from '@loopback/testlab';
import {Main} from '../../../application';
import {MongoDataSource} from '../../../datasources';
import {Pokemon} from '../../../models/pokemon/pokemon.model';
import {MONGODB_CONFIG, testingNonPersistedPokemonName, testingPokemons, testingPokemonsAmount} from '../../fixtures';
import {setupApplication} from '../test-helper';
import {PokemonRepository} from './../../../repositories/pokemon.repository';
import {testingNonPersistedPokemonType} from './../../fixtures/pokemons';

describe('[CONTROLLERS] - Pokemon - /pokemons', () => {
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

  describe('Working with "limit"', () => {
    it('returns the amount of pokemons limited by configuration, when no filtering parameters are provided', async () => {
      await client
        .get(`/pokemons`)
        .expect(200)
        .then(({ body }) => {
          const retrievedPokemons: Pokemon[] = body;
          expect(retrievedPokemons).to.length(parseInt(process.env.POKEMON_FILTER_DEFAULT_LIMIT!, 10));
        });
    });

    it('returns the amount of pokemons limited by custom value', async () => {
      const limit = 50;
      await client
        .get(`/pokemons?limit=${limit}`)
        .expect(200)
        .then(({ body }) => {
          const retrievedPokemons: Pokemon[] = body;
          expect(retrievedPokemons).to.length(limit);
        });
    });

    it('returns the whole list of pokemons when limit is set to 0', async () => {
      const limit = 0;
      await client
        .get(`/pokemons?limit=${limit}`)
        .expect(200)
        .then(({ body }) => {
          const retrievedPokemons: Pokemon[] = body;
          expect(retrievedPokemons).to.length(testingPokemonsAmount);
        });
    });

    it('returns BAD_REQUEST (400) when the filter value is lower than allowed', async () => {
      const limit = -1;
      await client
        .get(`/pokemons?limit=${limit}`)
        .expect(400)
        .then();
    });

    it('returns BAD_REQUEST (400) when the filter value is not valid', async () => {
      const limit = 'test';
      await client
        .get(`/pokemons?limit=${limit}`)
        .expect(400)
        .then();
    });
  });

  describe('Working with name', () => {
    it('returns the required pokemon by its name', async () => {
      const name = selectedPokemon.name;
      await client
        .get(`/pokemons?name=${name}`)
        .expect(200)
        .then(({ body }) => {
          const [retrievedPokemon]: Pokemon[] = body;
          expect(retrievedPokemon.name).to.eql(name);
        });
    });

    it('returns an empty array when a not persisted name is provided', async () => {
      const name = testingNonPersistedPokemonName;
      await client
        .get(`/pokemons?name=${name}`)
        .expect(200)
        .then(({ body }) => {
          const retrievedPokemons: Pokemon[] = body;
          expect(retrievedPokemons).to.length(0);
        });
    });

    it('returns BAD_REQUEST (400) when the pokemon name has not allowed character', async () => {
      const name = selectedPokemon.name.substring(2).concat('12');
      await client
        .get(`/pokemons?name=${name}`)
        .expect(400)
        .then();
    });
  })

  describe('Working with type', () => {
    it('returns the required pokemons by its type', async () => {
      const [type] = selectedPokemon.types;
      const expectedAmount = testingPokemons.reduce((result, { types }) => types.includes(type) ? ++result : result, 0);
      await client
        .get(`/pokemons?type=${type}`)
        .expect(200)
        .then(({ body }) => {
          const retrievedPokemons: Pokemon[] = body;
          expect(retrievedPokemons).to.length(expectedAmount);
        });
    });

    it('returns an empty array when a not persisted type is provided', async () => {
      const type = testingNonPersistedPokemonType;
      await client
        .get(`/pokemons?type=${type}`)
        .expect(200)
        .then(({ body }) => {
          const retrievedPokemons: Pokemon[] = body;
          expect(retrievedPokemons).to.length(0);
        });
    });

    it('returns BAD_REQUEST (400) when the pokemon type has not allowed character', async () => {
      const [rawType] = selectedPokemon.types;
      const type = rawType.substring(2).concat('12');
      await client
        .get(`/pokemons?type=${type}`)
        .expect(400)
        .then();
    });
  })

  describe('Working with pagination', () => {
    it('returns the required pokemons in the defined range', async () => {
      const page = 2;
      const limit = 10;
      const expectedPokemonIds = testingPokemons.slice((page - 1) * limit, page * limit).map(({ _id }) => _id);
      await client
        .get(`/pokemons?page=${page}&limit=${limit}`)
        .expect(200)
        .then(({ body }) => {
          const retrievedPokemons: Pokemon[] = body;
          expect(retrievedPokemons).to.length(limit);
          retrievedPokemons.forEach(pokemon => expect(expectedPokemonIds.includes(pokemon.id)).to.true())
        });
    });

    it('returns an empty array when the parameters are out of range', async () => {
      const page = 1000;
      const limit = 10;
      await client
        .get(`/pokemons?page=${page}&limit=${limit}`)
        .expect(200)
        .then(({ body }) => {
          const retrievedPokemons: Pokemon[] = body;
          expect(retrievedPokemons).to.length(0);
        });
    });

    it('returns BAD_REQUEST (400) when the page parameter has not allowed value', async () => {
      const page = -10;
      const limit = 10;
      await client
        .get(`/pokemons?page=${page}&limit=${limit}`)
        .expect(400);
    });

    it('returns BAD_REQUEST (400) when the page parameter has not allowed characters', async () => {
      const page = 'AB';
      const limit = 10;
      await client
        .get(`/pokemons?page=${page}&limit=${limit}`)
        .expect(400);
    });
  })

  describe('Working with favorite', () => {
    beforeEach(async () => {
      const pokemonToBeUpdated = (await pokemonRepository.findOne({ where: { id: selectedPokemon._id }}))!;
      await pokemonRepository.update(new Pokemon({...pokemonToBeUpdated, favorite: true}));
    })

    afterEach(async () => {
      await pokemonRepository.updateAll({ favorite: false});
    })

    it('returns the pokemons marked as favorite', async () => {
      const favorite = true;
      await client
        .get(`/pokemons?favorite=${favorite}`)
        .expect(200)
        .then(({ body }) => {
          const [retrievedPokemon]: Pokemon[] = body;
          expect(retrievedPokemon.id).to.eql(selectedPokemon._id);
        });
    });

    it('returns the whole pokemons, limited by default, when favorite is false, independently whether they are markes as favorite or not', async () => {
      const favorite = false;
      await client
        .get(`/pokemons?favorite=${favorite}`)
        .expect(200)
        .then(({ body }) => {
          const retrievedPokemons: Pokemon[] = body;
          expect(retrievedPokemons).to.length(parseInt(process.env.POKEMON_FILTER_DEFAULT_LIMIT!, 10));
        });
    });

    it('returns BAD_REQUEST (400) when the favorite parameter has not allowed characters', async () => {
      const favorite = 'AB';
      await client
        .get(`/pokemons?favorite=${favorite}`)
        .expect(400);
    });
  })
});
