import { MigrationInterface, QueryRunner } from "typeorm";

export class PopularTabelaLocalTreino1781210491612 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        INSERT INTO local_treino (loc_nome_local, loc_isActive) VALUES 
        ('Campo Principal - Grama', 1),
        ('Quadra Coberta', 1),
        ('Campo Sintético', 0);
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        DROP FROM local_treino;
        `)
    }

}
