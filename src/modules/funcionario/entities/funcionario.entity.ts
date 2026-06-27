import { Usuario } from "src/modules/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Funcionario {
  @PrimaryGeneratedColumn({ name: 'fun_id' })
  id: number;

  @Column({ name: 'fun_primeiro_nome', length: 95 })
  primeiroNome: string;

  @Column({ name: 'fun_sobrenome', length: 180 })
  sobrenome: string;

  @Column({ name: 'fun_data_nascimento' })
  dataNascimento: Date;

  @Column({ name: 'fun_cep', length: 20 })
  cep: string;

  @Column({ name: 'fun_rua', length: 150 })
  rua: string;

  @Column({ name: 'fun_numero', length: 50 })
  numero: string;

  @Column({ name: 'fun_bairro', length: 90 })
  bairro: string;

  @Column({ name: 'fun_cidade', length: 180 })
  cidade: string;

  @Column({ name: 'fun_estado', length: 10 })
  estado: string;

  @Column({ name: 'fun_complemento', length: 255, nullable: true })
  complemento: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamp' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamp' })
  atualizadoEm: Date;

  @OneToOne(() => Usuario, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;
}
