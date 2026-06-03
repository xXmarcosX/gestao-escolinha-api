import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaAvaliacao1780493328243 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE avaliacao(
                ava_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                ava_data DATETIME,
                ava_nota VARCHAR(15),
                instrutor_id INT,
                FOREIGN KEY (instrutor_id) REFERENCES instrutor(ins_id));
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE avaliacao;')
    }

}
