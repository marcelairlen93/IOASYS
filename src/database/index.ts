import { Connection, createConnection } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const undoAllMigrations = async (connection: Connection) => {
  for (let i = 0; i < connection.migrations.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await connection.undoLastMigration();
  }
  console.log('[TypeORM]: All migrations were undone');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const undoLastMigration = async (connection: Connection) => {
  await connection.undoLastMigration();
  console.log('[TypeORM]: Last migration was undone');
};

// Script to run all migrations
(async () => {
  const connection = await createConnection();
  await connection.runMigrations();
  console.log('[TypeORM]: Runned migrations');
})();

// Script to undo all migrations
// (async () => {
//   const connection = await createConnection();
//   await undoAllMigrations(connection);
//   console.log('[TypeORM]: Reverted all migrations');
// })();
