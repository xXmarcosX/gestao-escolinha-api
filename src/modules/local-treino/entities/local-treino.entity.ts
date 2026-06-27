import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'local_treino'})
export class LocalTreino {
    @PrimaryGeneratedColumn({name:'loc_id'})
    id?: number;
    
    @Column({name:'loc_nome_local'})
    nomeLocal?: string;
    
    @Column({name:'loc_isActive'})
    isActive?: boolean;

    @CreateDateColumn({name:'criado_em'})
    criadoEm?: Date;
            
    @UpdateDateColumn({name:'atualizado_em'})
    atualizadoEm?: Date;
}
