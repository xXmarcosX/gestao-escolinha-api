import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterarRestricaoEventosMedicos1783530704032 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Remove a restrição atual que está travando o delete
        await queryRunner.query(`
            ALTER TABLE \`eventos_medicos\` 
            DROP FOREIGN KEY \`eventos_medicos_ibfk_1\`;
        `);

        // 2. Recria a Foreign Key adicionando o ON DELETE CASCADE
        await queryRunner.query(`
            ALTER TABLE \`eventos_medicos\` 
            ADD CONSTRAINT \`eventos_medicos_ibfk_1\` 
            FOREIGN KEY (\`ficha_medica_id\`) 
            REFERENCES \`ficha_medica_aluno\`(\`fic_id\`) 
            ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Se precisar reverter, remove a chave com cascade
        await queryRunner.query(`
            ALTER TABLE \`eventos_medicos\` 
            DROP FOREIGN KEY \`eventos_medicos_ibfk_1\`;
        `);

        // E recria a chave original restritiva
        await queryRunner.query(`
            ALTER TABLE \`eventos_medicos\` 
            ADD CONSTRAINT \`eventos_medicos_ibfk_1\` 
            FOREIGN KEY (\`ficha_medica_id\`) 
            REFERENCES \`ficha_medica_aluno\`(\`fic_id\`);
        `);
    }

}
