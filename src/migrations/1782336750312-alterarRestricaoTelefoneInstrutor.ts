import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterarRestricaoTelefoneInstrutor1782336750312 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE telefone_instrutor 
            ADD CONSTRAINT fk_instrutor_telefone 
            FOREIGN KEY (instrutor_id) REFERENCES instrutor(ins_id) 
            ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE telefone_instrutor 
            DROP FOREIGN KEY fk_instrutor_telefone;
        `);
    }

}