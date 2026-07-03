import { TipoSanguineo } from "src/enums/tipo-sanguineo.enum";
import { Alergia } from "src/modules/alergia/entities/alergia.entity";
import { Aluno } from "src/modules/aluno/entities/aluno.entity";
import { EventosMedicos } from "src/modules/eventos-medicos/entities/eventos-medicos.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'ficha_medica_aluno'})
export class FichaMedicaAluno {
  @PrimaryGeneratedColumn({name: 'fic_id'})
  id: number;

  @Column({name: 'fic_tipo_sanguineo'})
  tipoSanguineo: TipoSanguineo;

  @CreateDateColumn({name: 'criado_em'})
  criadoEm: Date;

  @UpdateDateColumn({name: 'atualizado_em'})
  atualizadoEm: Date;

  @ManyToMany(() => Alergia, {eager: true})
  @JoinTable({
    name: 'ficha_medica_alergia', 
    joinColumn: { 
      name: 'ficha_medica_id', 
      referencedColumnName: 'id' 
    },
    inverseJoinColumn: { 
      name: 'alergia_id', 
      referencedColumnName: 'id' 
    },
  })
  alergias: Alergia[];

  @OneToMany(() => EventosMedicos, (eventos) => eventos.fichaMedica, {cascade: true, eager: true})
  eventosMedicos: EventosMedicos[];

  @OneToOne(() => Aluno, (aluno) => aluno.fichaMedica)
  aluno: Aluno;
}
