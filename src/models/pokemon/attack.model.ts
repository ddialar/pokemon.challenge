import {Model, model, property} from '@loopback/repository';
import {Resistant} from './pokemon.constants';

@model()
export class Attack extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Resistant,
    },
  })
  type: string;

  @property({
    type: 'number',
    required: true,
  })
  damage: number;

  constructor(data?: Partial<Attack>) {
    super(data);
  }
}
