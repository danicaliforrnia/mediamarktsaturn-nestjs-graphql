import { Exclude, Expose } from 'class-transformer';
import { OrderStatusEnum } from '../entities/order-status.enum';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReadOrderItemDto } from './read-order-item.dto';

@Exclude()
@ObjectType()
export class ReadOrderDto {
    @Field(() => Int)
    @Expose()
    readonly id: number;

    @Field(() => Int)
    @Expose()
    readonly orderNumber: number;

    @Field()
    @Expose()
    readonly status: OrderStatusEnum;

    @Field(() => [ReadOrderItemDto], {
        nullable: true,
    })
    @Expose()
    readonly orderItems?: ReadOrderItemDto[];

    @Field()
    @Expose()
    readonly createdAt: Date;

    @Field()
    @Expose()
    readonly updatedAt: Date;
}
