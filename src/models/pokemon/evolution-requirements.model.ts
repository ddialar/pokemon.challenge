import {Model, model, property} from '@loopback/repository';

@model()
export class EvolutionRequirements extends Model {
  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<EvolutionRequirements>) {
    super(data);
  }
}
