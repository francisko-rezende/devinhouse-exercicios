import { MigrationInterface, QueryRunner } from "typeorm";

export class tweetsJoinCol1670162428537 implements MigrationInterface {
    name = 'tweetsJoinCol1670162428537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP CONSTRAINT "FK_c4d0505d9622fbd7d529a59497a"`);
        await queryRunner.query(`ALTER TABLE "tweets" RENAME COLUMN "userUserId" TO "user"`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD CONSTRAINT "FK_3ff8e039cfa6601851e1593401c" FOREIGN KEY ("user") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP CONSTRAINT "FK_3ff8e039cfa6601851e1593401c"`);
        await queryRunner.query(`ALTER TABLE "tweets" RENAME COLUMN "user" TO "userUserId"`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD CONSTRAINT "FK_c4d0505d9622fbd7d529a59497a" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
