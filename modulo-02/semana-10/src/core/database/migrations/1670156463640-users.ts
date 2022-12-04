import { MigrationInterface, QueryRunner } from "typeorm";

export class users1670156463640 implements MigrationInterface {
    name = 'users1670156463640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "user" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "photoUrl" character varying NOT NULL, CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
