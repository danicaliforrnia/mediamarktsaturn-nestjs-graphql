import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('item')
export class ItemEntity {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int',
    })
    readonly id: number;

    @Column({
        name: 'name',
        length: 200,
        type: 'varchar',
        nullable: false,
    })
    name: string;

    @Column({
        name: 'description',
        length: 400,
        type: 'varchar',
        nullable: false,
    })
    description: string;

    @Column({
        name: 'price',
        type: 'decimal',
        nullable: false,
        precision: 10,
        scale: 2,
    })
    price: number;
}
