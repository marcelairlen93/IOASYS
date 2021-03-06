import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateFKFilmActor1614904021840 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey('film_actor', new TableForeignKey({
      name: 'fk_film_actor__actor',
      columnNames: ['actor_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'actor',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
    await queryRunner.createForeignKey('film_actor', new TableForeignKey({
      name: 'fk_film_actor__film',
      columnNames: ['film_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'film',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('film_actor', 'fk_film_actor__film');
    await queryRunner.dropForeignKey('film_actor', 'fk_film_actor__actor');
  }
}
