import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Alergia {
  @PrimaryGeneratedColumn({ name: 'ale_id' })
  id: number;

  @Column({ name: 'ale_tipo_alergia' })
  tipoAlergia: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm: Date
}
