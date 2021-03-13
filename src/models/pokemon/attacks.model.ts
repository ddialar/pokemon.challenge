import {Model, model, property} from '@loopback/repository';
import {Attack} from './attack.model';

@model()
export class Attacks extends Model {
  @property({
    type: 'array',
    itemType: Attack,
    required: true,
  })
  fast: Attack[];

  @property({
    type: 'array',
    itemType: Attack,
    required: true,
  })
  special: Attack[];

  constructor(data?: Partial<Attacks>) {
    super(data);
  }
}
