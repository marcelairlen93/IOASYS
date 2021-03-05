import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateFKUser_Role1614903302541 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('user', new TableForeignKey({
      name: 'fk_user__role',
      columnNames: ['role'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user_role',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('user', 'fk_user__role');
  }
}
