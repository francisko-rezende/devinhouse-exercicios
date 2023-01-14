import { MigrationInterface, QueryRunner } from "typeorm";

export class rmUserId1670172262917 implements MigrationInterface {
    name = 'rmUserId1670172262917'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP COLUMN "userId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" ADD "userId" integer NOT NULL`);
    }

}
