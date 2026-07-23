import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterarRestricaoTabelaMensalidade1784827630013 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
          ALTER TABLE mensalidade 
          MODIFY COLUMN tipo_pagamento_id INT NULL DEFAULT NULL;;
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
          ALTER TABLE mensalidade
          MODIFY COLUMN tipo_pagamento_id INT NOT NULL;
        `)
    }

}
