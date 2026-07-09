import { MigrationInterface, QueryRunner } from "typeorm";

export class InverterChaveFichaMedicaAluno1783528277197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`aluno\` 
            DROP FOREIGN KEY \`aluno_ibfk_3\`;
        `);

        await queryRunner.query(`
            ALTER TABLE \`aluno\` 
            DROP COLUMN \`ficha_medica_id\`;
        `);

        await queryRunner.query(`
            ALTER TABLE \`ficha_medica_aluno\` 
            ADD \`aluno_id\` INT NULL;
        `);

        await queryRunner.query(`
            ALTER TABLE \`ficha_medica_aluno\` 
            ADD CONSTRAINT \`FK_ficha_medica_aluno\` 
            FOREIGN KEY (\`aluno_id\`) 
            REFERENCES \`aluno\`(\`alu_id\`) 
            ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`ficha_medica_aluno\` 
            DROP FOREIGN KEY \`FK_ficha_medica_aluno\`;
        `);

        await queryRunner.query(`
            ALTER TABLE \`ficha_medica_aluno\` 
            DROP COLUMN \`aluno_id\`;
        `);

        await queryRunner.query(`
            ALTER TABLE \`aluno\` 
            ADD \`ficha_medica_id\` INT NULL;
        `);

        await queryRunner.query(`
            ALTER TABLE \`aluno\` 
            ADD CONSTRAINT \`aluno_ibfk_3\` 
            FOREIGN KEY (\`ficha_medica_id\`) 
            REFERENCES \`ficha_medica_aluno\`(\`fic_id\`);
        `);
    }

}
