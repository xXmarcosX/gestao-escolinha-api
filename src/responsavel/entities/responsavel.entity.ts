import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TelefoneResponsavel } from '../telefone-responsavel/entities/telefone-responsavel.entity';

@Entity()
export class Responsavel {
  @PrimaryGeneratedColumn({ name: 'res_id' })
  id: number;

  @Column({ name: 'res_primeiro_nome', length: 95 })
  primeiroNome: string;

  @Column({ name: 'res_sobrenome', length: 180 })
  sobrenome: string;

  @Column({ name: 'res_data_nascimento'})
  dataNascimento: Date;

  @Column({ name: 'res_cep', length: 20 })
  cep: string;

  @Column({ name: 'res_rua', length: 150 })
  rua: string;

  @Column({ name: 'res_numero', length: 50 })
  numero: string;

  @Column({ name: 'res_bairro', length: 90 })
  bairro: string;

  @Column({ name: 'res_cidade', length: 180 })
  cidade: string;

  @Column({ name: 'res_estado', length: 10 })
  estado: string;

  @Column({ name: 'res_complemento', length: 255, nullable: true })
  complemento: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm: Date;

  @OneToOne(() => Usuario, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @OneToMany(() => TelefoneResponsavel, (telefone) => telefone.responsavel, {cascade: true, onDelete: 'CASCADE'})
  telefones: TelefoneResponsavel[];
}