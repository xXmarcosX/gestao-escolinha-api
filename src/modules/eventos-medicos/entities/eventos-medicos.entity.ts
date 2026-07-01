import { TipoEventoMedico } from 'src/modules/tipo-evento-medico/entities/tipo-evento-medico.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'eventos_medicos' })
export class EventosMedicos {
  @PrimaryGeneratedColumn({name: 'eve_id'})
  id: number;

  @Column({name: 'eve_data_evento'})
  dataEvento: Date;

  @Column({name: 'eve_descricao_evento'})
  descricaoEvento: string;

  @Column({name: 'criado_em'})
  criadoEm: Date;

  @Column({name: 'atualizado_em'})
  atualizadoEm: Date;

  @ManyToOne(() => TipoEventoMedico)
  tipoEventoMedico: TipoEventoMedico;
}