import { Responsavel } from "src/modules/responsavel/entities/responsavel.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'telefone_responsavel'})
export class TelefoneResponsavel {
  @PrimaryGeneratedColumn({name: 'tel_id'})
  id: number;

  @Column({name: 'tel_numero', length: 25})
  numero: string;

  @ManyToOne(() => Responsavel, (resp) => resp.telefones, {nullable: false})
  @JoinColumn({name: 'responsavel_id'})
  responsavel: Responsavel;
  
  @CreateDateColumn({name: 'criado_em'})
  criadoEm: Date;
  
  @UpdateDateColumn({name: 'atualizado_em'})
  atualizadoEm: Date;
}