import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaLocalTreino1780493811187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE local_treino(
                loc_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                loc_nome_local VARCHAR(90) NOT NULL,
                loc_isActive TINYINT,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE local_treino;')
    }

}
