import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaAvaliacaoAluno1780494691840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE avaliacao_aluno(
                avaliacao_ava_id INT NOT NULL,
                aluno_alu_id INT NOT NULL,
                PRIMARY KEY (avaliacao_ava_id, aluno_alu_id),
                FOREIGN KEY (avaliacao_ava_id) REFERENCES avaliacao(ava_id) ON DELETE CASCADE,
                FOREIGN KEY (aluno_alu_id) REFERENCES aluno(alu_id) ON DELETE CASCADE);
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE avaliacao_aluno;')
    }

}
