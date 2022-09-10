import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './config/database-config/database-config.module';
import { AppConfigModule } from './config/app-config/app-config.module';
import { DatabaseProviderModule } from './providers/database-provider/database-provider.module';
import { GraphqlProviderModule } from './providers/graphql-provider/graphql-provider.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        GraphqlProviderModule,
        AppConfigModule,
        DatabaseConfigModule,
        DatabaseProviderModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
