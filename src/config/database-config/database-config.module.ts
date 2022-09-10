import { Module } from '@nestjs/common';
import configuration from './configuration';
import { DatabaseConfigService } from './database-config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
    ],
    providers: [DatabaseConfigService],
    exports: [DatabaseConfigService],
})
export class DatabaseConfigModule {}
