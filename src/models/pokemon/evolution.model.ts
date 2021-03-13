import {Model, model, property} from '@loopback/repository';

@model()
export class Evolution extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  constructor(data?: Partial<Evolution>) {
    super(data);
  }
}
