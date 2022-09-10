import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlConfigModule } from '../../config/graphql-config/graphql-config.module';
import { GraphqlConfigService } from '../../config/graphql-config/graphql-config.service';
import { join } from 'path';

@Module({
    imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
            driver: ApolloDriver,
            imports: [GraphqlConfigModule],
            useFactory: async (graphqlConfigService: GraphqlConfigService) => ({
                debug: graphqlConfigService.debug,
                playground: graphqlConfigService.playground,
                autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
                sortSchema: true,
            }),
            inject: [GraphqlConfigService],
        }),
    ],
})
export class GraphqlProviderModule {}
