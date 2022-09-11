import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { OrderEntity } from './entities/order.entity';
import { OrderStatusEnum } from './entities/order-status.enum';
import { CustomerEntity } from './entities/customer.entity';
import { ItemEntity } from './entities/item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderNotFoundException } from './errors/order-not-found.exception';

describe('OrdersService', () => {
    let service: OrdersService;
    const customer: CustomerEntity = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        username: 'john.doe@email.com',
        phoneNumber: '+0 000000000',
        addressLine1: 'line 1',
        addressLine2: 'line 2',
    };
    const item: ItemEntity = {
        id: 1,
        name: 'Item1',
        description: 'Description1',
        price: 10,
    };
    const orders: OrderEntity[] = [
        {
            id: 1,
            orderNumber: 12345,
            totalAmount: 100,
            status: OrderStatusEnum.IN_PROGRESS,
            items: [item],
            customer,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: 2,
            orderNumber: 12346,
            totalAmount: 20,
            status: OrderStatusEnum.OPEN,
            items: [item],
            customer,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                {
                    provide: getRepositoryToken(OrderEntity),
                    useValue: {
                        find: jest.fn().mockResolvedValue(orders),
                        findOneBy: jest.fn().mockImplementation(({ id }) => {
                            return orders.find((order) => order.id === id);
                        }),
                        save: jest.fn().mockImplementation((order) => order),
                    },
                },
            ],
        }).compile();

        service = module.get<OrdersService>(OrdersService);
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
        const response = await service.updateStatus({
            id: orderToUpdate.id,
            status: newStatus,
        });
        expect(response.id).toEqual(orderToUpdate.id);
        expect(response.status).toEqual(newStatus);
    });
});
