import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { OrderStatusEnum } from './order-status.enum';
import { CustomerEntity } from './customer.entity';
import { OrderItemEntity } from './order_item.entity';

@Entity('order')
export class OrderEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
    })
    readonly id: number;

    @Column({
        name: 'order_number',
        type: 'int',
        nullable: false,
    })
    orderNumber: number;

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

    @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
        eager: true,
        cascade: false,
        persistence: false,
        orphanedRowAction: 'delete',
    })
    orderItems?: OrderItemEntity[];

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
