import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaTelefoneInstrutor1780494427652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`
            CREATE TABLE telefone_instrutor(
                tel_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                tel_numero VARCHAR(25) NOT NULL,
                instrutor_id INT NOT NULL,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (instrutor_id) REFERENCES instrutor(ins_id));
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('DROP TABLE telefone_instrutor;')
    }

}
