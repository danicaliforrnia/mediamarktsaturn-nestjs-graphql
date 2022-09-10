import { Module } from '@nestjs/common';
import { GraphqlConfigService } from './graphql-config.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
        }),
    ],
    providers: [GraphqlConfigService],
    exports: [GraphqlConfigService],
})
export class GraphqlConfigModule {}
