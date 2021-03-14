import {
  MigrationInterface, QueryRunner, Table, TableIndex,
} from 'typeorm';

export class CreateCommands1615643241936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'commands',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'description',
          type: 'varchar',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }));

    await queryRunner.createIndex('commands', new TableIndex({
      name: 'IDX_COMMAND_NAME',
      columnNames: ['name'],
    }));

    await queryRunner
      .manager
      .createQueryBuilder()
      .insert()
      .into('commands')
      .values([
        { name: 'commandlist', description: 'Show commands list' },

        { name: 'grouptotal', description: 'Show total groups -> /grouptotal' },
        { name: 'grouplist', description: 'Show internal groups list -> /grouplist/{page}' },
        { name: 'groupadd', description: 'Add new internal group -> /groupadd/{group_name}/{group_description}' },
        { name: 'groupremove', description: 'Remove internal group -> /grouparm/{group_id}' },
        { name: 'groupupdate', description: 'Update internal group -> /groupaupdate/{group_id}/{group_new_name}' },

        { name: 'clienttotal', description: 'Show total clients -> /clienttotal' },
        { name: 'clientlist', description: 'Show clients -> /clientlist/{page}' },
        { name: 'clientadd', description: 'Add new client -> /clientadd/{client_number or client_number,client_number,client_number, ...}' },
        { name: 'clientupdate', description: 'Update client -> /clientupdate/{client_id}/{client_number}' },
        { name: 'clientremove', description: 'Remove client by id -> /clientremove/{client_id}' },
        { name: 'clientremovebynumber', description: 'Remove client by number -> /clientremovebynumber/{client_number}' },

        { name: 'groupclienttotal', description: 'Show total clients in group by groupId -> /groupclienttotal/{group_id}' },
        { name: 'groupclientlistbygroupid', description: 'Show clients in group by groupId -> /groupclientlistbygroupid/{group_id}/{page}' },
        { name: 'groupclientlistbygroupname', description: 'Show clients in group by groupName -> /groupclientlistbygroupname/{group_name}/{page}' },
        { name: 'groupclientadd', description: 'Add new client in group -> /groupclientadd/{group_id}/{client_number or client_number,client_number,client_number, ...}' },
        { name: 'groupclientremovebygroupid', description: 'Remove client from group by groupId -> /groupclientremovebygroupid/{group_id}' },
        { name: 'groupclientremovebyclientnumber', description: 'Remove client from group by clientNumber -> /groupclientremovebyclientnumber/{client_number}' },

        { name: 'sendmessagetogroup', description: 'Send broadcast message to group by groupId -> /sendmessagetogroup/{group_id}/{text_message}' },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('commands');
  }
}
