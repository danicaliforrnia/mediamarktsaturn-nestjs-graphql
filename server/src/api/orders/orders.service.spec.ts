import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderEntity } from './entities/order.entity';
import { OrderStatusEnum } from './entities/order-status.enum';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderNotFoundException } from './errors/order-not-found.exception';
import { Repository } from 'typeorm';
import { orders } from '../../tests/mock-data';
import { mockOrdersRepository } from '../../tests/mock-implementations';

describe('OrdersService', () => {
    let service: OrdersService;
    let ordersRepository: Repository<OrderEntity>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                {
                    provide: getRepositoryToken(OrderEntity),
                    useValue: mockOrdersRepository,
                },
            ],
        }).compile();

        service = module.get<OrdersService>(OrdersService);
        ordersRepository = module.get<Repository<OrderEntity>>(
            getRepositoryToken(OrderEntity),
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return all orders', async () => {
        const allOrders = await service.findAll();
        expect(allOrders).toEqual(expect.any(Array));
        expect(allOrders.length).toBeGreaterThanOrEqual(orders.length);
    });

    it('should return an order by its id', async () => {
        expect(await service.findById(orders[0].id)).toMatchObject(orders[0]);
    });

    it('should throw order not found when searching by id', async () => {
        await expect(() => service.findById(Date.now())).rejects.toThrowError(
            OrderNotFoundException,
        );
    });

    it('should update order', async () => {
        const orderToUpdate = { ...orders[0] };
        const newStatus = OrderStatusEnum.COMPLETE;
        const spySave = jest.spyOn(ordersRepository, 'save');
        const response = await service.updateStatus({
            id: orderToUpdate.id,
            status: newStatus,
        });
        expect(spySave).toHaveBeenCalledTimes(1);
        expect(spySave).toHaveBeenCalledWith({
            ...orderToUpdate,
            status: newStatus,
        });
        expect(response.id).toEqual(orderToUpdate.id);
        expect(response.status).toEqual(newStatus);
    });
});
