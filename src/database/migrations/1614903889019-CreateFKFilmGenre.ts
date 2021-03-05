import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateFKFilmGenre1614903889019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('film_genre', new TableForeignKey({
      name: 'fk_film_genre__genre',
      columnNames: ['genre_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'genre',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
    await queryRunner.createForeignKey('film_genre', new TableForeignKey({
      name: 'fk_film_genre__film',
      columnNames: ['film_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'film',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('film_genre', 'fk_film_genre__film');
    await queryRunner.dropForeignKey('film_genre', 'fk_film_genre__genre');
  }
}
