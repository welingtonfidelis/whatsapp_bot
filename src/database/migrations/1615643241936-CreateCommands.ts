import { getRepository, MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

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
                    default: 'now()'
                }
            ]
        }));

        await queryRunner.createIndex("commands", new TableIndex({
            name: "IDX_COMMAND_NAME",
            columnNames: ["name"]
        }));

        await queryRunner
            .manager
            .createQueryBuilder()
            .insert()
            .into("commands")
            .values([
                { name: 'commandlist', description: 'Show commands list' },
                { name: 'grouplist', description: 'Show internal groups list' },
                { name: 'groupadd', description: 'Add new internal group -> /groupadd/{group_name}/{group_description}' },
                { name: 'groupremove', description: 'Remove internal group -> /grouparm/{group_id}' },
                { name: 'groupupdate', description: 'Update internal group -> /groupaupdate/{group_id}/{group_new_name}' },
            ])
            .execute()
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('commands');
    }
}
