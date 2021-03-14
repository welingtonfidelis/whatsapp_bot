import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateGroupsClients1615676454806 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'groups_clients',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'group_id',
          type: 'int',
        },
        {
          name: 'client_id',
          type: 'int',
        },
      ],
      uniques: [
        {
          name: 'UNIQUE_GROUP_CLIENT',
          columnNames: ['group_id', 'client_id'],
        },
      ],
      foreignKeys: [
        {
          name: 'FKGroup',
          referencedTableName: 'groups',
          referencedColumnNames: ['id'],
          columnNames: ['group_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          name: 'FKClient',
          referencedTableName: 'clients',
          referencedColumnNames: ['id'],
          columnNames: ['client_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('groups_clients');
  }
}
