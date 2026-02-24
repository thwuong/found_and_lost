import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddItemClaimFields1771925190660 implements MigrationInterface {
  name = 'AddItemClaimFields1771925190660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "item" ADD "claimedAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "item" ADD "isClaimed" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "isClaimed"`);
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "claimedAt"`);
  }
}
