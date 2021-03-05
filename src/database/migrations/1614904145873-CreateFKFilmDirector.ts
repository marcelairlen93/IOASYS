import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateFKFilmDirector1614904145873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('film_director', new TableForeignKey({
      name: 'fk_film_director__director',
      columnNames: ['director_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'director',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
    await queryRunner.createForeignKey('film_director', new TableForeignKey({
      name: 'fk_film_director__film',
      columnNames: ['film_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'film',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('film_director', 'fk_film_director__film');
    await queryRunner.dropForeignKey('film_director', 'fk_film_director__director');
  }
}
