import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaPresenca1780494318581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`
            CREATE TABLE presenca(
                pre_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                pre_isPresente TINYINT,
                pre_observacao VARCHAR(255),
                aluno_id INT NOT NULL,
                treino_id INT NOT NULL, 
                FOREIGN KEY (aluno_id) REFERENCES aluno(alu_id),
                FOREIGN KEY (treino_id) REFERENCES treino(tre_id));
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('DROP DATABASE presenca;')
    }

}
