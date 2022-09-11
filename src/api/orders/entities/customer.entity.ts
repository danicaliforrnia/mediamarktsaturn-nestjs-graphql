import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('customer')
export class CustomerEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
    })
    readonly id: number;

    @Column({
        name: 'first_name',
        length: 200,
        type: 'varchar',
        nullable: false,
    })
    firstName: string;

    @Column({
        name: 'last_name',
        length: 200,
        type: 'varchar',
        nullable: false,
    })
    lastName: string;

    @Column({
        name: 'username',
        length: 200,
        type: 'varchar',
        nullable: false,
    })
    username: string;

    @Column({
        name: 'phone_number',
        length: 20,
        type: 'varchar',
        nullable: false,
    })
    phoneNumber: string;

    @Column({
        name: 'address_line_1',
        length: 400,
        type: 'varchar',
        nullable: false,
    })
    addressLine1: string;

    @Column({
        name: 'address_line_2',
        length: 400,
        type: 'varchar',
        nullable: false,
    })
    addressLine2: string;

    @OneToMany(() => OrderEntity, (category) => category.customer, {
        eager: false,
        cascade: false,
        orphanedRowAction: 'delete',
    })
    orders?: OrderEntity[];
}
