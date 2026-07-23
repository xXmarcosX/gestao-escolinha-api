import { Responsavel } from "src/modules/responsavel/entities/responsavel.entity";
import { TipoPagamento } from "src/modules/tipo-pagamento/entities/tipo-pagamento.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Mensalidade {
  @PrimaryGeneratedColumn({ name: 'men_id' })
  id: number;

  @Column({ name: 'men_data_vencimento', nullable: true })
  dataVencimento: Date;

  @CreateDateColumn({name: 'men_data_emissao'})
  dataEmissao: Date;

  @Column({name: 'men_preco'})
  preco: number;

  @Column({name: 'men_isPaga'})
  isPaga: boolean;

  @ManyToOne(() => Responsavel)
  @JoinColumn({name: 'responsavel_id'})
  responsavel: Responsavel;

  @ManyToOne(() => TipoPagamento)
  @JoinColumn({name: 'tipo_pagamento_id'})
  tipoPagamento: TipoPagamento;
}
