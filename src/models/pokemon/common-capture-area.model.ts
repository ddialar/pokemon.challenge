import {Model, model, property} from '@loopback/repository';

@model()
export class CommonCaptureArea extends Model {
  @property({
    type: 'string',
    required: true,
  })
  report: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  locations: string[];

  constructor(data?: Partial<CommonCaptureArea>) {
    super(data);
  }
}
