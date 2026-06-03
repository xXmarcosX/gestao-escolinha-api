import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaTicket1780494634341 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE ticket(
                tic_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                tic_conteudo VARCHAR(255) NOT NULL,
                tic_data_emitido DATETIME NOT NULL,
                tic_isRespondido TINYINT,
                tic_data_resposta DATETIME,
                responsavel_id INT,
                funcionario_id INT,
                FOREIGN KEY (responsavel_id) REFERENCES responsavel(res_id),
                FOREIGN KEY (funcionario_id) REFERENCES funcionario(fun_id));
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE ticket;')
    }

}
