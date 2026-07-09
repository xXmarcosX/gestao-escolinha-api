import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterarTicketDataEmitido1783621996099 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE ticket 
            MODIFY COLUMN tic_data_emitido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE ticket 
            MODIFY COLUMN tic_data_emitido DATETIME NOT NULL;
        `);
    }

}