import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateItem1768269371654 implements MigrationInterface {
  name = 'CreateItem1768269371654';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "item" ADD "userId" integer`);
    await queryRunner.query(
      `CREATE INDEX "IDX_5369db3bd33839fd3b0dd5525d" ON "item" ("userId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "item" DROP CONSTRAINT "FK_5369db3bd33839fd3b0dd5525d1"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_5369db3bd33839fd3b0dd5525d"`,
    );
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "userId"`);
    await queryRunner.query(
      `ALTER TABLE "item" ADD "userId" character varying NOT NULL`,
    );
  }
}
