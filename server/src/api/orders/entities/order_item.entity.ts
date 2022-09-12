import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ItemEntity } from './item.entity';

@Entity('order_item')
export class OrderItemEntity {
    @ManyToOne(() => OrderEntity, {
        nullable: false,
        eager: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'order_id',
    })
    @PrimaryColumn({
        name: 'order_id',
        type: 'int',
    })
    order?: OrderEntity;

    @ManyToOne(() => ItemEntity, {
        nullable: false,
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'item_id',
    })
    @PrimaryColumn({
        name: 'item_id',
        type: 'int',
    })
    item: ItemEntity;

    @Column({
        name: 'quantity',
        type: 'int',
        nullable: false,
        default: 1,
    })
    quantity: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        nullable: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        nullable: false,
        select: false,
    })
    updatedAt: Date;
}
