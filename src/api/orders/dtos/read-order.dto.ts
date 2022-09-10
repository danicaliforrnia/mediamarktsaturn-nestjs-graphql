import { Exclude, Expose } from 'class-transformer';
import { OrderStatusEnum } from '../entities/order-status.enum';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Exclude()
@ObjectType()
export class ReadOrderDto {
    @Field(() => Int)
    @Expose()
    readonly id: number;

    @Field(() => Int)
    @Expose()
    readonly orderNumber: number;

    @Field(() => Float)
    @Expose()
    readonly totalAmount: number;

    @Field()
    @Expose()
    readonly status: OrderStatusEnum;

    @Field()
    @Expose()
    readonly createdAt: Date;

    @Field()
    @Expose()
    readonly updatedAt: Date;
}
