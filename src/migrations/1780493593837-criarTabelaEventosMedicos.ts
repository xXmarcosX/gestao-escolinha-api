import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaEventosMedicos1780493593837 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE eventos_medicos(
                eve_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                eve_data_evento DATE,
                eve_descricao_evento VARCHAR(100),
                ficha_medica_id INT NOT NULL,
                tipo_evento_medico_id INT NOT NULL,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (ficha_medica_id) REFERENCES ficha_medica_aluno(fic_id),
                FOREIGN KEY (tipo_evento_medico_id) REFERENCES tipo_evento_medico(tip_id));
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('DROP TABLE eventos_medicos;')
    }

}
