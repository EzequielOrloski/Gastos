import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import schemas from './schemas';
import { Transaction, Categorias } from './models';

const adapter = new SQLiteAdapter({
  schema: schemas,
  dbName: 'gastos'
});

const database = new Database({ adapter, modelClasses: [Transaction, Categorias] });

export default database;