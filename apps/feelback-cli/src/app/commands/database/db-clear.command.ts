import { Command, Console, createSpinner } from 'nestjs-console';
import { getConnection, Connection } from 'typeorm';
import { IDENTITY_DB_CONNECTION_NAME } from '@cancerlog/api/database';

@Console()
export class DBClearCommand {
  @Command({
    command: 'db:clear <tables>',
    description:
      'truncates given tables (i.e., doctors,identities) and uses CASCADE DELETE',
  })
  async truncateTables(tableParam: string): Promise<void> {
    const tablesToTruncate = tableParam.split(',').map((table) => {
      return table.trim();
    });

    const spinner = createSpinner();

    spinner.start('Registering DB Connections');
    const feelbackConnection = await getConnection();
    const identityConnection = await getConnection(IDENTITY_DB_CONNECTION_NAME);

    const feelbackTableNames = feelbackConnection.entityMetadatas.map(
      (meta) => meta.tableName,
    );
    const identityTableNames = identityConnection.entityMetadatas.map(
      (meta) => meta.tableName,
    );

    spinner.succeed('Registered DB Connections');

    for (const tableToTruncate of tablesToTruncate) {
      spinner.start(`Truncating Table ${tableToTruncate}...`);

      let currentConnection: Connection;
      if (feelbackTableNames.includes(tableToTruncate)) {
        currentConnection = feelbackConnection;
      }
      if (identityTableNames.includes(tableToTruncate)) {
        currentConnection = identityConnection;
      }

      if (!currentConnection) {
        spinner.fail(`Could not find registered Table ${tableToTruncate}`);
        continue;
      }

      try {
        await currentConnection.query(`TRUNCATE ${tableToTruncate} CASCADE`);
        spinner.succeed(`Cleared Table ${tableToTruncate}`);
      } catch (exception) {
        spinner.fail(`Exception while truncating Table ${tableToTruncate}`);
        continue;
      }
    }

    console.log('[x] Job Done');
  }
}
