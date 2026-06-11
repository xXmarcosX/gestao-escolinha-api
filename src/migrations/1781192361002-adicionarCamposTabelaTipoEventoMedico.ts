import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionarCamposTabelaTipoEventoMedico1781192361002 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          ALTER TABLE tipo_evento_medico
          ADD COLUMN criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          ADD COLUMN atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE tipo_evento_medico
      DROP COLUMN atualizado_em,
      DROP COLUMN criado_em;
      `)
  }

}
