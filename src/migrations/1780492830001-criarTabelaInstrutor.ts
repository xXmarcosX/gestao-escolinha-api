import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaInstrutor1780492830001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE instrutor(
                ins_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                usuario_id INT NOT NULL UNIQUE,
                ins_primeiro_nome VARCHAR(45) NOT NULL,
                ins_sobrenome VARCHAR(180) NOT NULL,
                ins_cpf VARCHAR(20) NOT NULL UNIQUE,
                ins_data_nascimento DATE,
                ins_cep VARCHAR(20) NOT NULL,
                ins_rua VARCHAR(150) NOT NULL,
                ins_numero VARCHAR(50) NOT NULL,
                ins_bairro VARCHAR(90) NOT NULL,
                ins_cidade VARCHAR(180) NOT NULL,
                ins_estado VARCHAR(10) NOT NULL,
                ins_complemento VARCHAR(255),
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_id) REFERENCES usuario(usu_id) ON DELETE CASCADE);
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE instrutor;')
    }

}
