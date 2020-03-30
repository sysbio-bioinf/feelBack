import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { SeederService } from './commands/services/seeder.service';
import { AppModule } from './app.module';

@Module({
  imports: [AppModule, ConsoleModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class CliModule {}
