import { Instrutor } from "src/modules/instrutor/entities/instrutor.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'telefone_instrutor'})
export class TelefoneInstrutor {
  @PrimaryGeneratedColumn({name: 'tel_id'})
    id: number;
  
    @Column({name: 'tel_numero', length: 25})
    numero: string;
  
    @ManyToOne(() => Instrutor, (instrutor) => instrutor.telefones, {nullable: false})
    @JoinColumn({name: 'instrutor_id'})
    instrutor: Instrutor;
    
    @CreateDateColumn({name: 'criado_em'})
    criadoEm: Date;
    
    @UpdateDateColumn({name: 'atualizado_em'})
    atualizadoEm: Date;
}