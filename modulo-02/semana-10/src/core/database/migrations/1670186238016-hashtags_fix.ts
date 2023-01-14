import { MigrationInterface, QueryRunner } from "typeorm";

export class hashtagsFix1670186238016 implements MigrationInterface {
    name = 'hashtagsFix1670186238016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hashtags" ADD "hashtag" character varying(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hashtags" ADD CONSTRAINT "UQ_563da52b0374381662197352383" UNIQUE ("hashtag")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hashtags" DROP CONSTRAINT "UQ_563da52b0374381662197352383"`);
        await queryRunner.query(`ALTER TABLE "hashtags" DROP COLUMN "hashtag"`);
    }

}
