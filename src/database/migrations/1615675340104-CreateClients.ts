import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm";

export class CreateClients1615675340104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'clients',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'number',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }));

        await queryRunner.createIndex("clients", new TableIndex({
            name: "IDX_CLIENT_NUMBER",
            columnNames: ["number"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('clients');
    }
}