import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterarRestricaoEventosMedicos1783530704032 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`eventos_medicos\` 
            DROP FOREIGN KEY \`eventos_medicos_ibfk_1\`;
        `);

        await queryRunner.query(`
            ALTER TABLE \`eventos_medicos\` 
            ADD CONSTRAINT \`eventos_medicos_ibfk_1\` 
            FOREIGN KEY (\`ficha_medica_id\`) 
            REFERENCES \`ficha_medica_aluno\`(\`fic_id\`) 
            ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`eventos_medicos\` 
            DROP FOREIGN KEY \`eventos_medicos_ibfk_1\`;
        `);

        await queryRunner.query(`
            ALTER TABLE \`eventos_medicos\` 
            ADD CONSTRAINT \`eventos_medicos_ibfk_1\` 
            FOREIGN KEY (\`ficha_medica_id\`) 
            REFERENCES \`ficha_medica_aluno\`(\`fic_id\`);
        `);
    }

}
