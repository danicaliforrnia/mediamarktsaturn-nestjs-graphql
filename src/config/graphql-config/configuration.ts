import { registerAs } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql/dist/interfaces/gql-module-options.interface';
import { join } from 'path';

export default registerAs(
    'graphql',
    () =>
        ({
            debug: process.env.GRAPHQL_DEBUG === 'true',
            playground: process.env.GRAPHQL_PLAYGROUND === 'true',
            autoSchemaFile: join(process.cwd(), 'schema.gql'),
            sortSchema: true,
        } as GqlModuleOptions),
);
