import { FichaMedicaAluno } from 'src/modules/ficha-medica-aluno/entities/ficha-medica-aluno.entity';
import { TipoEventoMedico } from 'src/modules/tipo-evento-medico/entities/tipo-evento-medico.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'eventos_medicos' })
export class EventosMedicos {
  @PrimaryGeneratedColumn({name: 'eve_id'})
  id: number;

  @Column({name: 'eve_data_evento'})
  dataEvento: Date;

  @Column({name: 'eve_descricao_evento'})
  descricaoEvento: string;

  @CreateDateColumn({name: 'criado_em'})
  criadoEm: Date;

  @UpdateDateColumn({name: 'atualizado_em'})
  atualizadoEm: Date;

  @ManyToOne(() => TipoEventoMedico)
  @JoinColumn({name: 'tipo_evento_medico_id'})
  tipoEventoMedico: TipoEventoMedico;

  @ManyToOne(() => FichaMedicaAluno, (fichaMedica) => fichaMedica.eventosMedicos, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'ficha_medica_id'})
  fichaMedica: FichaMedicaAluno;
}