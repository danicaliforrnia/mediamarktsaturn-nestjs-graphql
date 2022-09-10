import { MigrationInterface, QueryRunner } from 'typeorm';

export class orders1662849483235 implements MigrationInterface {
    name = 'orders1662849483235';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "item" ("id" SERIAL NOT NULL, "name" character varying(200) NOT NULL, "description" character varying(400) NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."order_status_enum" AS ENUM('OPEN', 'IN_PROGRESS', 'COMPLETE')`,
        );
        await queryRunner.query(
            `CREATE TABLE "order" ("id" SERIAL NOT NULL, "order_number" double precision NOT NULL, "total_amount" numeric(10,2) NOT NULL, "status" "public"."order_status_enum" NOT NULL DEFAULT 'OPEN', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "customer_id" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "customer" ("id" SERIAL NOT NULL, "first_name" character varying(200) NOT NULL, "last_name" character varying(200) NOT NULL, "username" character varying(200) NOT NULL, "phone_number" character varying(20) NOT NULL, "address_line_1" character varying(400) NOT NULL, "address_line_2" character varying(400) NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "items_in_orders" ("order_id" integer NOT NULL, "item_id" integer NOT NULL, CONSTRAINT "PK_8a0c88723bfee4d36e8c89c60e4" PRIMARY KEY ("order_id", "item_id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_465907bc20423e1a3dc1fc608d" ON "items_in_orders" ("order_id") `,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_159162d23502a1ee12341296b1" ON "items_in_orders" ("item_id") `,
        );
        await queryRunner.query(
            `ALTER TABLE "order" ADD CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "items_in_orders" ADD CONSTRAINT "FK_465907bc20423e1a3dc1fc608dc" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "items_in_orders" ADD CONSTRAINT "FK_159162d23502a1ee12341296b1a" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "items_in_orders" DROP CONSTRAINT "FK_159162d23502a1ee12341296b1a"`,
        );
        await queryRunner.query(
            `ALTER TABLE "items_in_orders" DROP CONSTRAINT "FK_465907bc20423e1a3dc1fc608dc"`,
        );
        await queryRunner.query(
            `ALTER TABLE "order" DROP CONSTRAINT "FK_cd7812c96209c5bdd48a6b858b0"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_159162d23502a1ee12341296b1"`,
        );
        await queryRunner.query(
            `DROP INDEX "public"."IDX_465907bc20423e1a3dc1fc608d"`,
        );
        await queryRunner.query(`DROP TABLE "items_in_orders"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
        await queryRunner.query(`DROP TABLE "item"`);
    }
}
