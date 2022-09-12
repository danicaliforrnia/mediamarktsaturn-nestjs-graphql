import { Exclude, Expose } from 'class-transformer';
import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@Exclude()
@ObjectType()
export class ReadItemDto {
    @Field(() => Int)
    @Expose()
    readonly id: number;

    @Field()
    @Expose()
    readonly name: string;

    @Field()
    @Expose()
    readonly description: string;

    @Field(() => Float)
    @Expose()
    readonly price: number;
}
