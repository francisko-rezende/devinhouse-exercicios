import { MigrationInterface, QueryRunner } from "typeorm";

export class hashtags1670185052146 implements MigrationInterface {
    name = 'hashtags1670185052146'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hashtags" ("hashtagId" SERIAL NOT NULL, CONSTRAINT "PK_51f05f12a0d05b588f31f2ba154" PRIMARY KEY ("hashtagId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hashtags"`);
    }

}
