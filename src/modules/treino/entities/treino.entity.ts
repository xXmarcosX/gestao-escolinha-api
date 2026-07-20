import { Instrutor } from "src/modules/instrutor/entities/instrutor.entity";
import { LocalTreino } from "src/modules/local-treino/entities/local-treino.entity";
import { Turma } from "src/modules/turma/entities/turma.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Treino {
  @PrimaryGeneratedColumn({name: 'tre_id'})
  id: number;

  @Column({name: 'tre_data_treino'})
  dataTreino: Date;

  @Column({name: 'tre_descricao'})
  descricao: string;

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
