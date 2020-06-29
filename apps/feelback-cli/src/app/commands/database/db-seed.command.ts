import { Command, Console, createSpinner } from 'nestjs-console';
import { availableSeeders } from '../../../database/seeds/seeders';
import { Seeder } from '@feelback-app/api/database';

@Console()
export class DBSeedCommand {
  @Command({
    command: 'db:seed <seed>',
    description: 'seed the database with a seeder file',
  })
  async seedDatabase(seedName: string): Promise<void> {
    const spinner = createSpinner();

    const availableSeedNames = availableSeeders.map((seed) => seed.name);

    spinner.start(`Loading Seed File ${seedName}...`);

    if (!availableSeedNames.includes(seedName)) {
      spinner.fail(`Could not find seed ${seedName}`);
      return;
    }

    spinner.succeed(`Seed ${seedName} loaded...`);

    const seederPosition = availableSeedNames.findIndex(
      (seed) => seed === seedName,
    );
    const seederClass = availableSeeders[seederPosition];
    try {
      const seeder = new seederClass() as Seeder;
      spinner.start(`Seeding Data`);
      await seeder.seed();
      spinner.succeed(`Seeded ${seedName}`);
    } catch (exception) {
      spinner.fail(`Failed seeding ${seedName}`);
      return;
    }
  }
}
