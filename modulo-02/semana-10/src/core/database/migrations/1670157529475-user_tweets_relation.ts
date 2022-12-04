import { MigrationInterface, QueryRunner } from "typeorm";

export class userTweetsRelation1670157529475 implements MigrationInterface {
    name = 'userTweetsRelation1670157529475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" ADD "userUserId" integer`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD CONSTRAINT "FK_c4d0505d9622fbd7d529a59497a" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP CONSTRAINT "FK_c4d0505d9622fbd7d529a59497a"`);
        await queryRunner.query(`ALTER TABLE "tweets" DROP COLUMN "userUserId"`);
    }

}
