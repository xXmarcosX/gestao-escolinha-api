import { Funcionario } from "src/modules/funcionario/entities/funcionario.entity";
import { Responsavel } from "src/modules/responsavel/entities/responsavel.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn({name: 'tic_id'})
  id: number;

  @Column({name: 'tic_conteudo'})
  conteudo: string;

  @CreateDateColumn({name: 'tic_data_emitido'})
  dataEmitido: Date;

  @Column({name: 'tic_isRespondido'})
  isRespondido: boolean;

  @Column({name: 'tic_data_resposta'})
  dataResposta: Date;

  @ManyToOne(() => Responsavel)
  @JoinColumn({name: 'responsavel_id'})
  responsavel: Responsavel;

  @ManyToOne(() => Funcionario)
  @JoinColumn({name: 'funcionario_id'})
  funcionario: Funcionario | null;
}
