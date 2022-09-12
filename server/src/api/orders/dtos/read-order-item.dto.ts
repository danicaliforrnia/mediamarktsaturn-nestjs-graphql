import { Exclude, Expose } from 'class-transformer';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ReadItemDto } from './read-item.dto';

@Exclude()
@ObjectType()
export class ReadOrderItemDto {
    @Field()
    @Expose()
    readonly item: ReadItemDto;

    @Field(() => Int)
    @Expose()
    readonly quantity: number;
}
