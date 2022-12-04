import { MigrationInterface, QueryRunner } from "typeorm";

export class usersAndTweets1670160830788 implements MigrationInterface {
    name = 'usersAndTweets1670160830788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "user" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "photoUrl" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "tweets" ("tweetId" SERIAL NOT NULL, "text" character varying(280) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userUserId" integer, CONSTRAINT "PK_07404e917c1f47575b0b54f435b" PRIMARY KEY ("tweetId"))`);
        await queryRunner.query(`ALTER TABLE "tweets" ADD CONSTRAINT "FK_c4d0505d9622fbd7d529a59497a" FOREIGN KEY ("userUserId") REFERENCES "users"("userId") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tweets" DROP CONSTRAINT "FK_c4d0505d9622fbd7d529a59497a"`);
        await queryRunner.query(`DROP TABLE "tweets"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
