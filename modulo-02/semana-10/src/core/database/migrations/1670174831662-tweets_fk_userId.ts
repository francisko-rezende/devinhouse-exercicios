import { MigrationInterface, QueryRunner } from "typeorm";

export class tweetsFkUserId1670174831662 implements MigrationInterface {
    name = 'tweetsFkUserId1670174831662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP CONSTRAINT "FK_3ff8e039cfa6601851e1593401c"`);
        await queryRunner.query(`ALTER TABLE "tweets" RENAME COLUMN "user" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD CONSTRAINT "FK_8039099215c037f10c11b0cf228" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP CONSTRAINT "FK_8039099215c037f10c11b0cf228"`);
        await queryRunner.query(`ALTER TABLE "tweets" RENAME COLUMN "userId" TO "user"`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD CONSTRAINT "FK_3ff8e039cfa6601851e1593401c" FOREIGN KEY ("user") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
