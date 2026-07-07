import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UsuarioPerfil } from "../../../enums/usuario-perfil.enum";
import { Exclude } from "class-transformer";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'usu_id' })
  id: number;

  @Column({
    length: 180,
    name: 'usu_email',
    unique: true
  })
  email: string;

  @Column({name: 'usu_cpf'})
  cpf: string;

  @Column({
    length: 255,
    name: 'usu_senha_hash'
  })
  @Exclude()
  senha: string;

  @Column({
    type: 'enum',
    enum: UsuarioPerfil,
    name: 'usu_perfil'
  })
  tipoPerfil: UsuarioPerfil;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
