import { MigrationInterface, QueryRunner } from "typeorm";

export class PopularTabelaAlergia1780790047718 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO alergia (ale_tipo_alergia, criado_em, atualizado_em) VALUES 
                ('Lactose', '2026-05-20', '2026-05-28'),
                ('Glúten', '2026-05-21', '2026-05-29'),
                ('Poeira', '2026-05-22', '2026-05-30'),
                ('Penicilina', '2026-05-23', '2026-05-31'),
                ('Camarão', '2026-05-24', '2026-06-01'),
                ('Amendoim', '2026-05-25', '2026-06-02');
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DELETE FROM alergia;')
    }

}
