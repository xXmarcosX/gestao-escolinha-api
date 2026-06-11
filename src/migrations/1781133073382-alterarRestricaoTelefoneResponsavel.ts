import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterarRestricaoTelefoneResponsavel1781133073382 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE telefone_responsavel 
      DROP FOREIGN KEY telefone_responsavel_ibfk_1;
        `)

    await queryRunner.query(`
      ALTER TABLE telefone_responsavel 
      ADD CONSTRAINT fk_responsavel_telefone 
      FOREIGN KEY (responsavel_id) REFERENCES responsavel(res_id) 
      ON DELETE CASCADE;
      `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE telefone_responsavel 
      DROP FOREIGN KEY fk_responsavel_telefone;
    `);

    await queryRunner.query(`
      ALTER TABLE telefone_responsavel 
      ADD CONSTRAINT telefone_responsavel_ibfk_1 
      FOREIGN KEY (responsavel_id) REFERENCES responsavel(res_id);
      `)
  }
}
