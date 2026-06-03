import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaFichaMedica1780493057415 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE ficha_medica_aluno(
                fic_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                fic_tipo_sanguineo VARCHAR(10) NOT NULL,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `)

        await queryRunner.query(`
            CREATE TABLE ficha_medica_alergia(
                ficha_medica_id INT NOT NULL,
                alergia_id INT NOT NULL,
                PRIMARY KEY (ficha_medica_id, alergia_id),
                FOREIGN KEY (ficha_medica_id) REFERENCES ficha_medica_aluno(fic_id) ON DELETE CASCADE,
                FOREIGN KEY (alergia_id) REFERENCES alergia(ale_id) ON DELETE CASCADE
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE ficha_medica_alergia;`);
        await queryRunner.query(`DROP TABLE ficha_medica_aluno;`);
    }

}