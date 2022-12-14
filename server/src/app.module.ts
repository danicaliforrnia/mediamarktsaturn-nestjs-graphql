import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './config/database-config/database-config.module';
import { AppConfigModule } from './config/app-config/app-config.module';
import { GraphqlProviderModule } from './providers/graphql-provider.module';
import { DatabaseProviderModule } from './providers/database-provider.module';
import { GraphqlConfigModule } from './config/graphql-config/graphql-config.module';
import { OrdersModule } from './api/orders/orders.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        AppConfigModule,
        DatabaseConfigModule,
        GraphqlConfigModule,
        GraphqlProviderModule,
        DatabaseProviderModule,
        OrdersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
