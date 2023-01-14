import { MigrationInterface, QueryRunner } from "typeorm";

export class tweetsUserId1670168028141 implements MigrationInterface {
    name = 'tweetsUserId1670168028141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" ADD "userId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP COLUMN "userId"`);
    }

}
