import {BootMixin} from '@loopback/boot';
import {ApplicationConfig, BindingKey} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {OpenApiSpec, RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {loggerMiddleware} from './middlewares/logger.middleware';
import {MySequence} from './sequence';

export {ApplicationConfig};

interface PackageInfo {
  name: string;
  version: string;
  description: string;
}

const PackageKey = BindingKey.create<PackageInfo>('application.package');
const pkg: PackageInfo = require('../package.json');

export class Main extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.middleware(loggerMiddleware);

    this.setUpBindings();

    this.sequence(MySequence);

    this.static('/', path.join(__dirname, '../public'));

    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    this.bootOptions = {
      controllers: {
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    const spec: OpenApiSpec = {
      openapi: '3.0.0',
      info: {title: pkg.name, version: pkg.version},
      paths: {},
      servers: [{url: '/api'}],
    };
    this.api(spec);
  }

  private setUpBindings() {
    this.bind(PackageKey).to(pkg);
  }
}
