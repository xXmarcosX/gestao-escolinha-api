import { MigrationInterface, QueryRunner } from "typeorm";

export class AdicionarColunasTreino1784659307193 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE treino 
            ADD COLUMN tre_dia_treino TEXT DEFAULT NULL,
            ADD COLUMN tre_horario_inicio_treino DATETIME DEFAULT NULL,
            ADD COLUMN tre_horario_fim_treino DATETIME DEFAULT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE treino 
            DROP COLUMN tre_dia_treino,
            DROP COLUMN tre_horario_inicio_treino,
            DROP COLUMN tre_horario_fim_treino;
        `);
    }

}
