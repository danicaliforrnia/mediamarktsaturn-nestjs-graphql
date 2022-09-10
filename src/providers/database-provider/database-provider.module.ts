import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfigType } from '../../config/database-config/configuration';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                ...configService.get<DatabaseConfigType>('database'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseProviderModule {}
