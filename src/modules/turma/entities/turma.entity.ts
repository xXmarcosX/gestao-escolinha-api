import { Aluno } from "src/modules/aluno/entities/aluno.entity";
import { Instrutor } from "src/modules/instrutor/entities/instrutor.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Turma {
  @PrimaryGeneratedColumn({name: 'tur_id'})
  id: number;

  @Column({name: 'tur_nome_turma'})
  nomeTurma: string;

  @ManyToOne(() => Instrutor)
  @JoinColumn({name: 'instrutor_id'})
  instrutor: Instrutor;

  @CreateDateColumn({name: 'criado_em'})
  criadoEm: Date;

  @UpdateDateColumn({name: 'atualizado_em'})
  atualizadoEm: Date;

  @OneToMany(() => Aluno, (aluno) => aluno.turma)
  alunos: Aluno[];
}
