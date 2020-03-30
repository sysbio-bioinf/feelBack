import { Console, Command, createSpinner } from 'nestjs-console';
import { getConnection } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { ApiPathHelper } from '@cancerlog/util/core';

@Console()
export class SeederService {
  @Command({
    command: 'truncate <tables>',
    description: 'Truncate database tables',
  })
  async truncateTables(input: string): Promise<void> {
    const spinner = createSpinner();

    const tables = input.split(',').map((item) => {
      return item.trim();
    });

    const connection = getConnection();
    spinner.start('Start truncating tables');

    for (const table of tables) {
      spinner.text = `TRUNCATING TABLE ${table}`;
      await connection.query(`TRUNCATE TABLE ${table};`);
    }

    spinner.succeed('Finished Truncating Tables');
  }

  @Command({
    command: 'seed <project> <file>',
    description: 'Seed the Database with new data from a file',
  })
  async seedFile(project: string, file: string): Promise<void> {
    const spinner = createSpinner();

    spinner.start(`Seeding File ${file}`);

    const filePath = path.join(ApiPathHelper.seedsPath(project), file);
    if (!fs.existsSync(filePath)) {
      spinner.fail(`File ${filePath} does not exist`);
      return;
    }

    const seeder = require(filePath);
    await seeder.seed();

    spinner.succeed('Seeding done');
  }
}
