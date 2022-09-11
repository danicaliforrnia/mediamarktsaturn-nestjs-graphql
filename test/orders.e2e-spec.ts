import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { OrdersModule } from '../src/api/orders/orders.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderEntity } from '../src/api/orders/entities/order.entity';
import { mockOrdersRepository } from '../src/tests/mock-implementations';
import { orders } from '../src/tests/mock-data';
import { GraphqlProviderModule } from '../src/providers/graphql-provider.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';

const URI = '/graphql';

describe('OrdersController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                OrdersModule,
                GraphQLModule.forRoot({
                    driver: ApolloDriver,
                    playground: false,
                    autoSchemaFile: 'schema.gql',
                }),
            ],
        })
            .overrideProvider(getRepositoryToken(OrderEntity))
            .useValue(mockOrdersRepository)
            .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Find All Orders', () => {
        return request(app.getHttpServer())
            .post(URI)
            .send({ query: '{orders{id}}' })
            .expect(200)
            .expect((res) => {
                expect(res.body.data.orders).toEqual(expect.any(Array));
                expect(res.body.data.orders.length).toEqual(orders.length);
            });
    });
});
