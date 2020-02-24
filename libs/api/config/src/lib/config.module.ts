import { Module, Global, DynamicModule } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { IEnvironment } from './interfaces/ienvironment';
import { ENV_CONFIGURATION } from './constants';

@Global()
@Module({})
export class ConfigModule {
  static forRoot(configuration: IEnvironment): DynamicModule {
    const configurationProvider = {
      provide: ENV_CONFIGURATION,
      useValue: configuration,
    };

    return {
      module: ConfigModule,
      providers: [configurationProvider, ConfigService],
      exports: [ConfigService],
    };
  }
}
