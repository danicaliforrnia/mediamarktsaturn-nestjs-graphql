import { OrderStatusEnum } from '../entities/order-status.enum';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsNumber } from 'class-validator';

@InputType()
export class UpdateOrderStatusDto {
    @Field(() => Int)
    @IsNumber()
    readonly id: number;

    @Field()
    @IsEnum(OrderStatusEnum)
    readonly status: OrderStatusEnum;
}
