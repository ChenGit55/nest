import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'DesafioDB',
        synchronize: false,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      });
      return dataSource.initialize();
    },
  },
];