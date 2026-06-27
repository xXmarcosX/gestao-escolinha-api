import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TelefoneInstrutor } from "../telefone-instrutor/entities/telefone-instrutor.entity";
import { Usuario } from "src/modules/usuario/entities/usuario.entity";

@Entity()
export class Instrutor {
  @PrimaryGeneratedColumn({ name: 'ins_id' })
  id: number;

  @Column({ name: 'ins_primeiro_nome', length: 95 })
  primeiroNome: string;

  @Column({ name: 'ins_sobrenome', length: 180 })
  sobrenome: string;

  @Column({ name: 'ins_data_nascimento' })
  dataNascimento: Date;

  @Column({ name: 'ins_cep', length: 20 })
  cep: string;

  @Column({ name: 'ins_rua', length: 150 })
  rua: string;

  @Column({ name: 'ins_numero', length: 50 })
  numero: string;

  @Column({ name: 'ins_bairro', length: 90 })
  bairro: string;

  @Column({ name: 'ins_cidade', length: 180 })
  cidade: string;

  @Column({ name: 'ins_estado', length: 10 })
  estado: string;

  @Column({ name: 'ins_complemento', length: 255, nullable: true })
  complemento: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm: Date;

  @OneToOne(() => Usuario, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @OneToMany(() => TelefoneInstrutor, (telefone) => telefone.instrutor, { cascade: true, onDelete: 'CASCADE' })
  telefones: TelefoneInstrutor[];
}
