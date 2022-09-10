import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderNotFoundException } from './errors/order-not-found.exception';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly ordersRepository: Repository<OrderEntity>,
    ) {}

    async findById(id: number): Promise<OrderEntity> {
        const order = await this.ordersRepository.findOne({
            where: {
                id,
            },
        });
        if (!order) {
            throw new OrderNotFoundException();
        }
        return order;
    }
}
