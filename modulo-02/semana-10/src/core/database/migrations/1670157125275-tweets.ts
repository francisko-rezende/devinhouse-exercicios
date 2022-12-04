import { MigrationInterface, QueryRunner } from "typeorm";

export class tweets1670157125275 implements MigrationInterface {
    name = 'tweets1670157125275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tweets" ("tweetId" SERIAL NOT NULL, "text" character varying(280) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_07404e917c1f47575b0b54f435b" PRIMARY KEY ("tweetId"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tweets"`);
    }

}
