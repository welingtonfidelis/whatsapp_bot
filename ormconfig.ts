export = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  // ssl: { // ONLY IN PRODUCTION
  //   rejectUnauthorized: false,
  // },
  entities: [
    'src/models/*.ts',
  ],
  migrations: [
    'src/database/migrations/*.ts',
  ],
  cli: {
    entitiesDir: 'src/models',
    migrationsDir: 'src/database/migrations',
  },
}
