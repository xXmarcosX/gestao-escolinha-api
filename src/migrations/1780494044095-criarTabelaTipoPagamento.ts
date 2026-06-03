import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaTipoPagamento1780494044095 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`
            CREATE TABLE tipo_pagamento(
                tip_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                tip_tipo_pagamento VARCHAR(50),
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP); 
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('DROP TABLE tipo_pagamento;')
    }

}
