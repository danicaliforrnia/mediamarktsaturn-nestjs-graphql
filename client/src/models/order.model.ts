import { OrderStatusEnum } from './order-status.enum';

export interface OrderModel {
    id: number;
    orderNumber: string;
    status: OrderStatusEnum;
    createdAt: Date;
    updatedAt: Date;
}
