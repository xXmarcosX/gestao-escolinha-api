import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelaUsuario1780491034891 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE usuario (
                usu_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                usu_email VARCHAR(180) NOT NULL UNIQUE,
                usu_senha_hash VARCHAR(255) NOT NULL, -- Armazenará a senha criptografada pela aplicação
                usu_perfil ENUM('ADMIN', 'FUNCIONARIO', 'INSTRUTOR', 'RESPONSAVEL') NOT NULL,
                criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);
                `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE usuario;')
    }

}
