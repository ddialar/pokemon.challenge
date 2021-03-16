export type PokemonRequestFilter = {
  name?: string;
  type?: string;
  page?: number;
  limit?: number;
  favorite?: boolean;
};
