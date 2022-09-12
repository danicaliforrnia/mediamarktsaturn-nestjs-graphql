import { MigrationInterface, QueryRunner } from 'typeorm';

export class orders1662985732303 implements MigrationInterface {
    name = 'orders1662985732303';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."order_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'COMPLETE')`,
        );
        await queryRunner.query(
            `CREATE TABLE "order"
             (
                 "id"           SERIAL                       NOT NULL,
                 "order_number" integer                      NOT NULL,
                 "status"       "public"."order_status_enum" NOT NULL DEFAULT 'OPEN',
                 "created_at"   TIMESTAMP                    NOT NULL DEFAULT now(),
                 "updated_at"   TIMESTAMP                    NOT NULL DEFAULT now(),
                 "customer_id"  integer                      NOT NULL,
                 CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
             )`,
        );
        await queryRunner.query(
            `CREATE TABLE "customer"
             (
                 "id"             SERIAL                 NOT NULL,
                 "first_name"     character varying(200) NOT NULL,
                 "last_name"      character varying(200) NOT NULL,
                 "username"       character varying(200) NOT NULL,
                 "phone_number"   character varying(20)  NOT NULL,
                 "address_line_1" character varying(400) NOT NULL,
                 "address_line_2" character varying(400) NOT NULL,
                 CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")
             )`,
        );
        await queryRunner.query(
            `CREATE TABLE "item"
             (
                 "id"          SERIAL                 NOT NULL,
                 "name"        character varying(200) NOT NULL,
                 "description" character varying(400) NOT NULL,
                 "price"       numeric(10, 2)         NOT NULL,
                 CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")
             )`,
        );
        await queryRunner.query(
            `CREATE TABLE "order_item"
             (
                 "order_id"   integer   NOT NULL,
                 "item_id"    integer   NOT NULL,
                 "quantity"   integer   NOT NULL DEFAULT '1',
                 "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                 "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                 CONSTRAINT "PK_3612208f415dcd5a11f32e1df52" PRIMARY KEY ("order_id", "item_id")
             )`,
        );
        await queryRunner.query(
            `ALTER TABLE "order"
                ADD CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0" FOREIGN KEY ("customer_id") REFERENCES "customer" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "order_item"
                ADD CONSTRAINT "FK_e9674a6053adbaa1057848cddfa" FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "order_item"
                ADD CONSTRAINT "FK_f9129a798f2308714d1e3be2463" FOREIGN KEY ("item_id") REFERENCES "item" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "order_item" DROP CONSTRAINT "FK_f9129a798f2308714d1e3be2463"`,
        );
        await queryRunner.query(
            `ALTER TABLE "order_item" DROP CONSTRAINT "FK_e9674a6053adbaa1057848cddfa"`,
        );
        await queryRunner.query(
            `ALTER TABLE "order" DROP CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0"`,
        );
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "item"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
    }
}
