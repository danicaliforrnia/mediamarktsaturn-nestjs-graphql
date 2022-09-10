import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ReadOrderDto } from './dtos/read-order.dto';
import { OrdersService } from './orders.service';
import { plainToClass } from 'class-transformer';

@Resolver(() => ReadOrderDto)
export class OrdersResolver {
    constructor(private readonly ordersService: OrdersService) {}

    @Query(() => [ReadOrderDto])
    async orders(): Promise<ReadOrderDto[]> {
        return [];
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
}
