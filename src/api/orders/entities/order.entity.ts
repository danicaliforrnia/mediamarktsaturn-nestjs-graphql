import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OrderStatusEnum } from './order-status.enum';
import { CustomerEntity } from './customer.entity';
import { ItemEntity } from './item.entity';

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
    })
    readonly id: number;

    @Column({
        name: 'order_number',
        type: 'float',
        nullable: false,
    })
    orderNumber: number;

    @Column({
        name: 'total_amount',
        type: 'decimal',
        nullable: false,
        precision: 10,
        scale: 2,
    })
    totalAmount: number;

    @Column({
        name: 'status',
        type: 'enum',
        nullable: false,
        enum: OrderStatusEnum,
        default: OrderStatusEnum.OPEN,
    })
    status: OrderStatusEnum;

    @ManyToOne(() => CustomerEntity, {
        nullable: false,
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinColumn({
        name: 'customer_id',
    })
    customer: CustomerEntity;

    @ManyToMany(() => ItemEntity, (item) => item.orders, {
        eager: true,
        cascade: true,
    })
    @JoinTable({
        name: 'items_in_orders',
        joinColumn: { name: 'order_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'item_id', referencedColumnName: 'id' },
    })
    items: ItemEntity[];

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
    })
    updatedAt: Date;
}
