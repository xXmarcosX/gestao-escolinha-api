import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaAluno1780493227533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE aluno(
                alu_id INT NOT NULL AUTO_INCREMENT,
                alu_primeiro_nome VARCHAR(45) NOT NULL,
                alu_sobrenome VARCHAR(180) NOT NULL,
                alu_email VARCHAR(190) NOT NULL,
                alu_cpf VARCHAR(20) NOT NULL UNIQUE,
                alu_sexo VARCHAR(5) NOT NULL,
                alu_data_nascimento DATE NOT NULL,
                alu_isAtivo TINYINT,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                responsavel_id INT,
                turma_id INT,
                ficha_medica_id INT NOT NULL,
                PRIMARY KEY (alu_id),
                FOREIGN KEY (responsavel_id) REFERENCES responsavel(res_id),
                FOREIGN KEY (turma_id) REFERENCES turma(tur_id),
                FOREIGN KEY (ficha_medica_id) REFERENCES ficha_medica_aluno(fic_id));
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE aluno;')
    }

}
