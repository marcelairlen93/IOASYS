import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateFKRating1614903746881 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('rating', new TableForeignKey({
      name: 'fk_rating__user',
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
    await queryRunner.createForeignKey('rating', new TableForeignKey({
      name: 'fk_rating__film',
      columnNames: ['film_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'film',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('rating', 'fk_rating__film');
    await queryRunner.dropForeignKey('rating', 'fk_rating__user');
  }
}
