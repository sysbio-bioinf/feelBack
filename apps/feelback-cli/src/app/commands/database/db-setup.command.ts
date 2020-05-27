import { Command, Console } from 'nestjs-console';

@Console()
export class DBSetupCommand {
  @Command({
    command: 'db-setup <production:boolean>',
    description: 'setup the database with initial values',
  })
  async echoOutput(production: string = 'false'): Promise<void> {
    if (production === 'true') {
      this.setupProductionDatabase();
    } else {
      this.setupTestDatabase();
    }
  }

  private setupTestDatabase(): void {
    console.log('test');
  }

  private setupProductionDatabase(): void {
    console.log('production');
  }
}
