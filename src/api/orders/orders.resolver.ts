import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ReadOrderDto } from './dtos/read-order.dto';
import { OrdersService } from './orders.service';
import { plainToClass } from 'class-transformer';
import { UpdateOrderStatusDto } from './dtos/update-order-status.dto';

@Resolver(() => ReadOrderDto)
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService) {}

    @Query(() => [ReadOrderDto])
    async orders(): Promise<ReadOrderDto[]> {
        return plainToClass(ReadOrderDto, await this.ordersService.findAll());
    }

    @Query(() => ReadOrderDto)
    async order(
        @Args('id', { type: () => Int }) id: number,
    ): Promise<ReadOrderDto> {
        return plainToClass(
            ReadOrderDto,
            await this.ordersService.findById(id),
        );
    }

    @Mutation(() => ReadOrderDto)
    async updateOrderStatus(
        @Args('status') status: UpdateOrderStatusDto,
    ): Promise<ReadOrderDto> {
        return plainToClass(
            ReadOrderDto,
            await this.ordersService.updateStatus(status),
        );
    }
}
