import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaTreino1780494194614 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`
            CREATE TABLE treino(
                tre_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                tre_data_treino DATETIME NOT NULL,
                tre_descricao VARCHAR(255),
                instrutor_id INT NOT NULL,
                turma_id INT NOT NULL,
                local_treino_id INT NOT NULL,
                FOREIGN KEY (instrutor_id) REFERENCES instrutor(ins_id),
                FOREIGN KEY (turma_id) REFERENCES turma(tur_id),
                FOREIGN KEY (local_treino_id) REFERENCES local_treino(loc_id));
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('DROP TABLE treino;')
    }

}
