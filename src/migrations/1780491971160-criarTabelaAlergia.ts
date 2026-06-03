import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaAlergia1780491971160 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE alergia(
                ale_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                ale_tipo_alergia VARCHAR(45) NOT NULL,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE alergia;')
    }

}
