import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { CustomerEntity } from './entities/customer.entity';
import { ItemEntity } from './entities/item.entity';
import { OrderEntity } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([OrderEntity])],
    providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
