import { Test, TestingModule } from '@nestjs/testing';
import { OrdersResolver } from './orders.resolver';

// Note: Skipped just for assessment purpose, find unit test example in orders.service.spec.ts

describe('OrdersResolver', () => {
    let resolver: OrdersResolver;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrdersResolver],
        }).compile();

        resolver = module.get<OrdersResolver>(OrdersResolver);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });
});
