import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPriorityToItem1771993903173 implements MigrationInterface {
  name = 'AddPriorityToItem1771993903173';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."item_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH')`,
    );
    await queryRunner.query(
      `ALTER TABLE "item" ADD "priority" "public"."item_priority_enum" NOT NULL DEFAULT 'MEDIUM'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "item" DROP COLUMN "priority"`);
    await queryRunner.query(`DROP TYPE "public"."item_priority_enum"`);
  }
}
