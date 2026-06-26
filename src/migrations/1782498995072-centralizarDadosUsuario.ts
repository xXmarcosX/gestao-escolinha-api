import { MigrationInterface, QueryRunner } from "typeorm";

export class CentralizarDadosUsuario1782498995072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE usuario ADD COLUMN usu_cpf VARCHAR(20) NOT NULL UNIQUE;`);

        await queryRunner.query(`ALTER TABLE responsavel DROP COLUMN res_cpf;`);
        await queryRunner.query(`ALTER TABLE instrutor DROP COLUMN ins_cpf;`);
        await queryRunner.query(`ALTER TABLE funcionario DROP COLUMN fun_cpf;`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE funcionario ADD COLUMN fun_cpf VARCHAR(20) NOT NULL UNIQUE;`);
        await queryRunner.query(`ALTER TABLE instrutor ADD COLUMN ins_cpf VARCHAR(20) NOT NULL UNIQUE;`);
        await queryRunner.query(`ALTER TABLE responsavel ADD COLUMN res_cpf VARCHAR(20) NOT NULL UNIQUE;`);

        await queryRunner.query(`ALTER TABLE usuario DROP COLUMN usu_cpf;`);
    }

}