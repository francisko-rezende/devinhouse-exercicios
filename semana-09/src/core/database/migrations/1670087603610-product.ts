import { MigrationInterface, QueryRunner } from "typeorm";

export class product1670087603610 implements MigrationInterface {
    name = 'product1670087603610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "price" double precision NOT NULL, "description" character varying(250) NOT NULL, "category" integer NOT NULL, "isActive" boolean NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
