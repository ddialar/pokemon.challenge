import {model} from '@loopback/repository';
import {Dimensions} from './dimensions.model';

@model()
export class Weight extends Dimensions {
  constructor(data?: Partial<Weight>) {
    super(data);
  }
}
