import { orders } from './mock-data';

export const mockOrdersRepository = {
    find: jest.fn().mockResolvedValue(orders),
    findOneBy: jest.fn().mockImplementation(({ id }) => {
        return orders.find((order) => order.id === id);
    }),
    save: jest.fn().mockImplementation((order) => order),
};
