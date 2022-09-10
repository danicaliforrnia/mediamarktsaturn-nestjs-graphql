import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { ApolloDriverConfig } from '@nestjs/apollo';

export default registerAs(
    'graphql',
    () =>
        ({
            debug: process.env.GRAPHQL_DEBUG === 'true',
            playground: process.env.GRAPHQL_PLAYGROUND === 'true',
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        } as ApolloDriverConfig),
);
