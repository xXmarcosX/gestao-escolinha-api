import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaFuncionario1780493740345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE funcionario(
                fun_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                usuario_id INT NOT NULL UNIQUE,
                fun_primeiro_nome VARCHAR(45) NOT NULL,
                fun_sobrenome VARCHAR(180) NOT NULL,
                fun_cpf VARCHAR(20) NOT NULL UNIQUE,
                fun_data_nascimento DATE,
                fun_cep VARCHAR(20) NOT NULL,
                fun_rua VARCHAR(150) NOT NULL,
                fun_numero VARCHAR(50) NOT NULL,
                fun_bairro VARCHAR(90) NOT NULL,
                fun_cidade VARCHAR(180) NOT NULL,
                fun_estado VARCHAR(10) NOT NULL,
                fun_complemento VARCHAR(255),
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_id) REFERENCES usuario(usu_id) ON DELETE CASCADE);
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query('DROP TABLE funcionario;')
    }

}
