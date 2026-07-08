import { MigrationInterface, QueryRunner } from "typeorm";

export class InverterChaveFichaMedicaAluno1783528277197 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Remove a chave estrangeira antiga da tabela 'aluno'
        // ATENÇÃO: Lembre-se de substituir 'NOME_DA_SUA_FK_ATUAL' pelo nome real da constraint
        await queryRunner.query(`
            ALTER TABLE \`aluno\` 
            DROP FOREIGN KEY \`aluno_ibfk_3\`;
        `);

        // 2. Deleta a coluna antiga 'ficha_medica_id' da tabela 'aluno'
        await queryRunner.query(`
            ALTER TABLE \`aluno\` 
            DROP COLUMN \`ficha_medica_id\`;
        `);

        // 3. Cria a coluna nova 'aluno_id' dentro da tabela 'ficha_medica_aluno'
        await queryRunner.query(`
            ALTER TABLE \`ficha_medica_aluno\` 
            ADD \`aluno_id\` INT NULL;
        `);

        // 4. Adiciona a nova Foreign Key com ON DELETE CASCADE na tabela correta
        await queryRunner.query(`
            ALTER TABLE \`ficha_medica_aluno\` 
            ADD CONSTRAINT \`FK_ficha_medica_aluno\` 
            FOREIGN KEY (\`aluno_id\`) 
            REFERENCES \`aluno\`(\`alu_id\`) 
            ON DELETE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 1. Remove a Foreign Key nova que tinha o CASCADE
        await queryRunner.query(`
            ALTER TABLE \`ficha_medica_aluno\` 
            DROP FOREIGN KEY \`FK_ficha_medica_aluno\`;
        `);

        // 2. Remove a coluna 'aluno_id' da ficha médica
        await queryRunner.query(`
            ALTER TABLE \`ficha_medica_aluno\` 
            DROP COLUMN \`aluno_id\`;
        `);

        // 3. Recria a coluna 'ficha_medica_id' na tabela 'aluno'
        await queryRunner.query(`
            ALTER TABLE \`aluno\` 
            ADD \`ficha_medica_id\` INT NULL;
        `);

        // 4. Recria a chave estrangeira original na tabela 'aluno'
        await queryRunner.query(`
            ALTER TABLE \`aluno\` 
            ADD CONSTRAINT \`aluno_ibfk_3\` 
            FOREIGN KEY (\`ficha_medica_id\`) 
            REFERENCES \`ficha_medica_aluno\`(\`fic_id\`);
        `);
    }

}
