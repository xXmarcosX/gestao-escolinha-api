import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionarRespostaEAssuntoTicket1783721316689 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE ticket 
            ADD COLUMN tic_resposta TEXT DEFAULT NULL,
            ADD COLUMN tic_assunto VARCHAR(255) DEFAULT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE ticket 
            DROP COLUMN tic_resposta,
            DROP COLUMN tic_assunto;
        `);
  }
  
}
