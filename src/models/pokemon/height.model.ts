import {model} from '@loopback/repository';
import {Dimensions} from './dimensions.model';

@model()
export class Height extends Dimensions {
  constructor(data?: Partial<Height>) {
    super(data);
  }
}
