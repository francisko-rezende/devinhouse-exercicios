import { MigrationInterface, QueryRunner } from "typeorm";

export class tweetsHashtagsRelation1670185229027 implements MigrationInterface {
    name = 'tweetsHashtagsRelation1670185229027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tweets_hashtags" ("tweetsTweetId" integer NOT NULL, "hashtagsHashtagId" integer NOT NULL, CONSTRAINT "PK_3cf85f3c06157f079eca5a42d1d" PRIMARY KEY ("tweetsTweetId", "hashtagsHashtagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7dedce1d66e4602933dfe25942" ON "tweets_hashtags" ("tweetsTweetId") `);
        await queryRunner.query(`CREATE INDEX "IDX_930b6ef0b6b62ced107cda7084" ON "tweets_hashtags" ("hashtagsHashtagId") `);
        await queryRunner.query(`ALTER TABLE "tweets_hashtags" ADD CONSTRAINT "FK_7dedce1d66e4602933dfe25942e" FOREIGN KEY ("tweetsTweetId") REFERENCES "tweets"("tweetId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tweets_hashtags" ADD CONSTRAINT "FK_930b6ef0b6b62ced107cda70842" FOREIGN KEY ("hashtagsHashtagId") REFERENCES "hashtags"("hashtagId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets_hashtags" DROP CONSTRAINT "FK_930b6ef0b6b62ced107cda70842"`);
        await queryRunner.query(`ALTER TABLE "tweets_hashtags" DROP CONSTRAINT "FK_7dedce1d66e4602933dfe25942e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_930b6ef0b6b62ced107cda7084"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7dedce1d66e4602933dfe25942"`);
        await queryRunner.query(`DROP TABLE "tweets_hashtags"`);
    }

}
