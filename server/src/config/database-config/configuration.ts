import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { CustomerEntity } from '../../api/orders/entities/customer.entity';
import { ItemEntity } from '../../api/orders/entities/item.entity';
import { OrderEntity } from '../../api/orders/entities/order.entity';
import { OrderItemEntity } from '../../api/orders/entities/order_item.entity';

export type DatabaseConfigType = PostgresConnectionOptions &
    TypeOrmModuleAsyncOptions;

export default registerAs(
    'database',
    () =>
        ({
            name: 'default',
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            database: process.env.DATABASE_NAME,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            logging: process.env.DATABASE_LOGGING,
            logger: process.env.DATABASE_LOGGER,
            entities: [
                CustomerEntity,
                ItemEntity,
                OrderEntity,
                OrderItemEntity,
            ],
            migrations: [`${__dirname}/../../database/migrations/*{.ts,.js}`],
            autoLoadEntities: true,
        } as DatabaseConfigType),
);
