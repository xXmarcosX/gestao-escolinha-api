import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaMensalidade1780494114491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`
            CREATE TABLE mensalidade(
                men_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                men_data_vencimento DATE NOT NULL,
                men_data_emissao DATE NOT NULL,
                men_preco DECIMAL(10,2) NOT NULL,
                men_isPaga TINYINT,
                responsavel_id INT NOT NULL,
                tipo_pagamento_id INT NOT NULL,
                FOREIGN KEY (responsavel_id) REFERENCES responsavel(res_id),
                FOREIGN KEY (tipo_pagamento_id) REFERENCES tipo_pagamento(tip_id));
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('DROP TABLE mensalidade;')
    }

}
