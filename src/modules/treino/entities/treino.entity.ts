import { Instrutor } from "src/modules/instrutor/entities/instrutor.entity";
import { LocalTreino } from "src/modules/local-treino/entities/local-treino.entity";
import { Turma } from "src/modules/turma/entities/turma.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { diasSemana } from "src/enums/diasSemana";

@Entity()
export class Treino {
  @PrimaryGeneratedColumn({name: 'tre_id'})
  id: number;

  @Column({name: 'tre_data_treino'})
  dataTreino: Date;

  @Column({name: 'tre_descricao'})
  descricao: string;

  @Column({name: 'tre_dia_treino'})
  diaTreino: diasSemana;

  @Column({name: 'tre_horario_inicio_treino'})
  horarioInicioTreino: Date;

  @Column({name: 'tre_horario_fim_treino'})
  horarioFimTreino: Date;

  @ManyToOne(() => Instrutor)
  @JoinColumn({name: 'instrutor_id'})
  instrutor: Instrutor;

  @ManyToOne(() => Turma)
  @JoinColumn({name: 'turma_id'})
  turma: Turma;

  @ManyToOne(() => LocalTreino)
  @JoinColumn({name: 'local_treino_id'})
  localTreino: LocalTreino;
}
