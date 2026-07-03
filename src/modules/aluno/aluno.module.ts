import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aluno } from './entities/aluno.entity';
import { ResponsavelModule } from 'src/modules/responsavel/responsavel.module';
import { UsuarioModule } from 'src/modules/usuario/usuario.module';
import { FichaMedicaAlunoModule } from '../ficha-medica-aluno/ficha-medica-aluno.module';
import { EventosMedicosModule } from '../eventos-medicos/eventos-medicos.module';

@Module({
  controllers: [AlunoController],
  providers: [AlunoService],
  imports: [
    TypeOrmModule.forFeature([Aluno]),
    ResponsavelModule,
    UsuarioModule,
    FichaMedicaAlunoModule,
    EventosMedicosModule
  ],
  exports: [AlunoService]
})
export class AlunoModule {}
