import { MigrationInterface, QueryRunner } from "typeorm";

export class userPasswordSalt1673723227281 implements MigrationInterface {
    name = 'userPasswordSalt1673723227281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "salt" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "salt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
