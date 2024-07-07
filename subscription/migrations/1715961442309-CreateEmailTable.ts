import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmailTable1715961442309 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        columns: [
          {
            generationStrategy: 'increment',
            isGenerated: true,
            isPrimary: true,
            name: 'id',
            type: 'int',
          },
          {
            isUnique: true,
            name: 'email',
            type: 'varchar',
          },
          {
            default: true,
            name: 'isSubscribed',
            type: 'boolean',
          },
        ],
        name: 'email',
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
