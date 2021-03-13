import {Model, model, property} from '@loopback/repository';

@model()
export class Dimensions extends Model {
  @property({
    type: 'string',
    required: true,
  })
  minimum: string;

  @property({
    type: 'string',
    required: true,
  })
  maximum: string;

  constructor(data?: Partial<Dimensions>) {
    super(data);
  }
}
