import { MigrationInterface, QueryRunner } from "typeorm";

export class PopularTabelaTipoEventoMedico1780790826191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO tipo_evento_medico (tip_evento) VALUES 
                ('Lesão'),
                ('Cirurgia');
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DELETE FROM tipo_evento_medico;')
    }

}
