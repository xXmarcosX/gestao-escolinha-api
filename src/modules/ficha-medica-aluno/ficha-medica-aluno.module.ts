import { Module } from '@nestjs/common';
import { FichaMedicaAlunoService } from './ficha-medica-aluno.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaMedicaAluno } from './entities/ficha-medica-aluno.entity';
import { EventosMedicosModule } from '../eventos-medicos/eventos-medicos.module';

@Module({
  providers: [FichaMedicaAlunoService],
  exports: [FichaMedicaAlunoService],
  imports: [
    TypeOrmModule.forFeature([FichaMedicaAluno]),
    EventosMedicosModule
  ]
})
export class FichaMedicaAlunoModule {}
