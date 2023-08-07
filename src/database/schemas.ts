import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'categorias',
      columns: [
        { name: 'type', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'icon', type: 'string' },
        { name: 'color', type: 'string' }
      ],
    }),
    tableSchema({
      name: 'transaction',
      columns: [
        { name: 'type', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'date', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'amount', type: 'number' },
        { name: 'index', type: 'string' },
        { name: 'categoria_id', type: 'string', isIndexed: true },
      ],
    }),
  ],
});