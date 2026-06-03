import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaTelefoneResponsavel1780494542146 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(`
            CREATE TABLE telefone_responsavel(
                tel_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                tel_numero VARCHAR(25) NOT NULL,
                responsavel_id INT NOT NULL,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (responsavel_id) REFERENCES responsavel(res_id));
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('DROP TABLE telefone_responsavel;')
    }

}
