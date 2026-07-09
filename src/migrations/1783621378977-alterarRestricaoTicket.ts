import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterarRestricaoTicket1783621378977 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
          ALTER TABLE ticket 
          ALTER COLUMN tic_data_resposta SET DEFAULT NULL,
          ALTER COLUMN funcionario_id SET DEFAULT NULL;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            ALTER TABLE ticket 
            ALTER COLUMN tic_data_resposta DROP DEFAULT,
            ALTER COLUMN funcionario_id DROP DEFAULT;
        `);
    }

}
