import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaTurma1780492904949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE turma(
                tur_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                tur_nome_turma VARCHAR(80) NOT NULL,
                instrutor_id INT,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (instrutor_id) REFERENCES instrutor(ins_id));
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE turma;')
    }

}
