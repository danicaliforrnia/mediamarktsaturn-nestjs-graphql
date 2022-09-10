import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseConfigModule } from '../../config/database-config/database-config.module';
import { DatabaseConfigService } from '../../config/database-config/database-config.service';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [DatabaseConfigModule],
            useFactory: async (databaseConfigService: DatabaseConfigService) =>
                ({
                    name: 'default',
                    type: 'postgres',
                    host: databaseConfigService.host,
                    port: databaseConfigService.port,
                    username: databaseConfigService.username,
                    password: databaseConfigService.password,
                    database: databaseConfigService.name,
                    logging: databaseConfigService.logging,
                    logger: databaseConfigService.logger,
                    entities: [`${__dirname}/../../apis/**/*.entity{.ts,.js}`],
                    migrations: [
                        `${__dirname}/../../database/migrations/*{.ts,.js}`,
                    ],
                    autoLoadEntities: true,
                } as PostgresConnectionOptions),
            inject: [DatabaseConfigService],
        } as TypeOrmModuleAsyncOptions),
    ],
})
export class DatabaseProviderModule {}
