import { Injectable, Logger, Inject } from '@nestjs/common';
import * as _ from 'lodash';
import { IEnvironment } from '../interfaces/ienvironment';
import { ENV_CONFIGURATION } from '../constants';

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);

  constructor(
    @Inject(ENV_CONFIGURATION)
    private readonly config: IEnvironment,
  ) {
    this.logger.log(
      `Running ${this.config.env.name} environment (production = ${this.config.env.production})`,
    );
  }

  get(key: string, defaultValue?: any): any {
    return _.get(this.config, key, defaultValue);
  }

  isProduction(): boolean {
    return this.config.env.production;
  }
}
