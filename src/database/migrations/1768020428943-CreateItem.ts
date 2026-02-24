import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateItem1768020428943 implements MigrationInterface {
  name = 'CreateItem1768020428943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."item_type_enum" AS ENUM('FOUND', 'LOST')`,
    );
    await queryRunner.query(
      `CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "type" "public"."item_type_enum" NOT NULL, "title" character varying(255) NOT NULL, "description" character varying(1000) NOT NULL, "category" character varying NOT NULL, "images" text NOT NULL, "foundLostDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "item"`);
    await queryRunner.query(`DROP TYPE "public"."item_type_enum"`);
  }
}
