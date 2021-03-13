import {Entity, model, property} from '@loopback/repository';
import {Attacks} from './attacks.model';
import {CommonCaptureArea} from './common-capture-area.model';
import {EvolutionRequirements} from './evolution-requirements.model';
import {Evolution} from './evolution.model';
import {Height} from './height.model';
import {Resistant, Weakeness} from './pokemon.constants';
import {Weight} from './weight.model';

@model()
export class Pokemon extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: true,
  })
  id: string;

  @property({
    required: true,
  })
  attacks: Attacks;

  @property({
    type: 'string',
  })
  class?: string;

  @property({
    type: 'string',
    required: true,
  })
  classification: string;

  @property()
  commonCaptureArea?: CommonCaptureArea;

  @property()
  evolutionRequirements?: EvolutionRequirements;

  @property({
    type: 'array',
    itemType: Evolution,
  })
  evolutions?: Evolution[];

  @property({
    type: 'number',
    required: true,
  })
  fleeRate: number;

  @property({
    required: true,
  })
  height: Height;

  @property({
    type: 'number',
    required: true,
  })
  maxCP: number;

  @property({
    type: 'number',
    required: true,
  })
  maxHP: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'array',
    itemType: Evolution,
  })
  previousEvolutions?: Evolution[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
    jsonSchema: {
      enum: Resistant,
    },
  })
  resistant: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
    // jsonSchema: {
    //   enum: PokemonType
    // }
  })
  types: string[];

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
    jsonSchema: {
      enum: Weakeness,
    },
  })
  weaknesses: string[];

  @property({
    required: true,
  })
  weight: Weight;

  constructor(data?: Partial<Pokemon>) {
    super(data);
  }
}

export interface PokemonRelations {
  // describe navigational properties here
}

export type PokemonWithRelations = Pokemon & PokemonRelations;
