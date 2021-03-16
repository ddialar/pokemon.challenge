import {Client, expect} from '@loopback/testlab';
import {Main} from '../../../application';
import {setupApplication} from '../test-helper';

describe('[CONTROLLERS] - Pokemon - /pokemons/types', () => {
  let app: Main;
  let client: Client;

  before(async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  })

  it('returns the expected pokemon types', async () => {
    const expectedTypes = [
      'Bug',
      'Dragon',
      'Electric',
      'Fairy',
      'Fighting',
      'Fire',
      'Flying',
      'Ghost',
      'Grass',
      'Ground',
      'Ice',
      'Normal',
      'Poison',
      'Psychic',
      'Rock',
      'Steel',
      'Water'
    ]
    await client
      .get('/pokemons/types')
      .expect(200)
      .then(({ body }) => {
        const retrievedTypes: string[] = body;
        expect(retrievedTypes).to.deepEqual(expectedTypes);
      });
  });
});
