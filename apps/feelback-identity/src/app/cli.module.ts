import { SeederCommand } from '@cancerlog/api/application';
import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { AppModule } from './app.module';

@Module({
  imports: [AppModule, ConsoleModule],
  providers: [SeederCommand],
  exports: [SeederCommand],
})
export class CliModule {}
