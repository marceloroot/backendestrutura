import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1603392844275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name:'images',
            columns:[
            {
                name:'id',
                type:'integer',
                unsigned:true,
                isPrimary:true,
                isGenerated:true,
                generationStrategy:'increment',
            },
            {
               name:'path',
               type:'varchar',
            },
            {
                 name:'estrutura_id',
                 type:'integer',
            },
           ],

           foreignKeys:[
            {
                 name:'ImageEstrutura',
                 columnNames:['estrutura_id'],
                 referencedTableName:'estruturas',
                 referencedColumnNames:['id'],
                 onUpdate:'CASCADE',
                 onDelete:'CASCADE',

            },
         ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
