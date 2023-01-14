import { MigrationInterface, QueryRunner } from "typeorm";

export class shoppingCart1670095018005 implements MigrationInterface {
    name = 'shoppingCart1670095018005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shoppingCart" ("user" integer NOT NULL, "total" integer NOT NULL, CONSTRAINT "PK_6635528fa059fe47f510bd0fc49" PRIMARY KEY ("user"))`);
        await queryRunner.query(`CREATE TABLE "shoppingCart_products" ("shoppingCartUser" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_8a46f95236214e440e840f36672" PRIMARY KEY ("shoppingCartUser", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6b98cab486e47a3e10bfc01052" ON "shoppingCart_products" ("shoppingCartUser") `);
        await queryRunner.query(`CREATE INDEX "IDX_2d7b09ad5c0218f30e3c2c5a4b" ON "shoppingCart_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "shoppingCart_products" ADD CONSTRAINT "FK_6b98cab486e47a3e10bfc010525" FOREIGN KEY ("shoppingCartUser") REFERENCES "shoppingCart"("user") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shoppingCart_products" ADD CONSTRAINT "FK_2d7b09ad5c0218f30e3c2c5a4b2" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shoppingCart_products" DROP CONSTRAINT "FK_2d7b09ad5c0218f30e3c2c5a4b2"`);
        await queryRunner.query(`ALTER TABLE "shoppingCart_products" DROP CONSTRAINT "FK_6b98cab486e47a3e10bfc010525"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2d7b09ad5c0218f30e3c2c5a4b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6b98cab486e47a3e10bfc01052"`);
        await queryRunner.query(`DROP TABLE "shoppingCart_products"`);
        await queryRunner.query(`DROP TABLE "shoppingCart"`);
    }

}
