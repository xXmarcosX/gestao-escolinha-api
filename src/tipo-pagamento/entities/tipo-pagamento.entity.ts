import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'tipo_pagamento'})
export class TipoPagamento {
    @PrimaryGeneratedColumn({name:'tip_id'})
    id?: number;

    @Column({name:'tip_tipo_pagamento'})
    tipoPagamento?: string;

    
    @CreateDateColumn({name:'criado_em'})
    criadoEm?: Date;

    
    @UpdateDateColumn({name:'atualizado_em'})
    atualizadoEm?: Date;
}