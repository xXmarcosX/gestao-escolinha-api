import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaTipoEventoMedico1780493520928 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE tipo_evento_medico(
                tip_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                tip_evento VARCHAR(20) NOT NULL);
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE tipo_evento_medico;')
    }

}
