import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

ConfigModule.forRoot({
    envFilePath: ['.env'],
});

const config: PostgresConnectionOptions & TypeOrmModuleOptions = {
    name: 'default',
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    synchronize: false,
    migrationsRun: true,
    entities: [`${__dirname}/../../apis/**/*.entity{.ts,.js}`],
    migrations: [`${__dirname}/../../database/migrations/*{.ts,.js}`],
    autoLoadEntities: true,
};

export = config;
