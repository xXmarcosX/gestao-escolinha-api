import { MigrationInterface, QueryRunner } from "typeorm";

export class PopularTabelaTipoPagamento1780790536116 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO tipo_pagamento (tip_tipo_pagamento, criado_em, atualizado_em) VALUES 
                ('Pix', '2026-05-01', '2026-05-20'),
                ('Cartão de Crédito', '2026-05-02', '2026-05-21'),
                ('Boleto Bancário', '2026-05-03', '2026-05-22'),
                ('Transferência Bancária', '2026-05-04', '2026-05-23'),
                ('Dinheiro', '2026-05-05', '2026-05-24');
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DELETE FROM tipo_pagamento;')
    }

}
