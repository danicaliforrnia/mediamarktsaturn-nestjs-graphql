import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderNotFoundException } from './errors/order-not-found.exception';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly ordersRepository: Repository<OrderEntity>,
    ) {}

    async findAll(): Promise<OrderEntity[]> {
        return this.ordersRepository.find();
    }

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

    async updateStatus({
        id,
        status,
    }: UpdateOrderStatusDto): Promise<OrderEntity> {
        const order = await this.ordersRepository.findOne({
            where: {
                id,
            },
        });
        if (!order) {
            throw new OrderNotFoundException();
        }
        order.status = status;
        return this.ordersRepository.save(order);
    }
}
