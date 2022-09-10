import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useFactory: async (configService: ConfigService) => ({
                ...configService.get<ApolloDriverConfig>('graphql'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class GraphqlProviderModule {}
