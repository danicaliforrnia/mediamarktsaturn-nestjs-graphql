import { CustomerEntity } from '../api/orders/entities/customer.entity';
import { ItemEntity } from '../api/orders/entities/item.entity';
import { OrderEntity } from '../api/orders/entities/order.entity';
import { OrderStatusEnum } from '../api/orders/entities/order-status.enum';

export const customer: CustomerEntity = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    username: 'john.doe@email.com',
    phoneNumber: '+0 000000000',
    addressLine1: 'line 1',
    addressLine2: 'line 2',
};
export const item: ItemEntity = {
    id: 1,
    name: 'Item1',
    description: 'Description1',
    price: 10,
};
export const orders: OrderEntity[] = [
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
