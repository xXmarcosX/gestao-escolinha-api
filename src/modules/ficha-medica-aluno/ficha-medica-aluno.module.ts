import { Module } from '@nestjs/common';
import { FichaMedicaAlunoService } from './ficha-medica-aluno.service';
import { FichaMedicaAlunoController } from './ficha-medica-aluno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaMedicaAluno } from './entities/ficha-medica-aluno.entity';
import { EventosMedicosModule } from '../eventos-medicos/eventos-medicos.module';

@Module({
  controllers: [FichaMedicaAlunoController],
  providers: [FichaMedicaAlunoService],
  imports: [
    TypeOrmModule.forFeature([FichaMedicaAluno]),
    EventosMedicosModule
  ]
})
export class FichaMedicaAlunoModule {}
