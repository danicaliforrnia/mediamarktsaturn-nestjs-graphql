import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            useFactory: async (configService: ConfigService) => ({
                ...configService.get<GqlModuleOptions>('graphql'),
            }),
            inject: [ConfigService],
        }),
    ],
})
export class GraphqlProviderModule {}
