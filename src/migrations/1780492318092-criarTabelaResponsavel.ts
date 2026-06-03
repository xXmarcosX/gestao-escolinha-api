import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaResponsavel1780492318092 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE responsavel(
                res_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                usuario_id INT NOT NULL UNIQUE, -- Garante que um utilizador é apenas um responsável
                res_primeiro_nome VARCHAR(95) NOT NULL,
                res_sobrenome VARCHAR(180) NOT NULL,
                res_data_nascimento DATE,
                res_cpf VARCHAR(20) NOT NULL UNIQUE,
                res_cep VARCHAR(20) NOT NULL,
                res_rua VARCHAR(150) NOT NULL,
                res_numero VARCHAR(50) NOT NULL,
                res_bairro VARCHAR(90) NOT NULL,
                res_cidade VARCHAR(180) NOT NULL,
                res_estado VARCHAR(10) NOT NULL,
                res_complemento VARCHAR(255),
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_id) REFERENCES usuario(usu_id) ON DELETE CASCADE);
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE responsavel;`);
    }
}
