import { Exclude, Expose } from 'class-transformer';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Exclude()
@ObjectType()
export class ReadCustomerDto {
    @Field(() => Int)
    @Expose()
    readonly id: number;

    @Field()
    @Expose()
    readonly firstName: string;

    @Field()
    @Expose()
    readonly lastName: string;

    @Field()
    @Expose()
    readonly username: string;

    @Field()
    @Expose()
    readonly phoneNumber: string;

    @Field()
    @Expose()
    readonly addressLine1: string;

    @Field()
    @Expose()
    readonly addressLine2: string;
}
