import { Sexo } from "src/enums/sexo.enum";
import { Responsavel } from "src/responsavel/entities/responsavel.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Aluno {
  @PrimaryGeneratedColumn({name: 'alu_id'})
  id: number;

  @Column({name: 'alu_primeiro_nome'})
  primeiroNome: string;

  @Column({name: 'alu_sobrenome'})
  sobrenome: string;

  @Column({name: 'alu_email'})
  email: string;

  @Column({name: 'alu_cpf'})
  cpf: string;

  @Column({name: 'alu_sexo'})
  sexo: Sexo;

  @Column({name: 'alu_data_nascimento'})
  dataNascimento: Date;

  @Column({name: 'alu_isAtivo'})
  ativo: boolean;

  @CreateDateColumn({name: 'criado_em'})
  criadoEm: Date;

  @UpdateDateColumn({name: 'atualizado_em'})
  atualizadoEm: Date;

  @ManyToOne(() => Responsavel)
  @JoinColumn({name: 'responsavel_id'})
  responsavel: Responsavel;
}
