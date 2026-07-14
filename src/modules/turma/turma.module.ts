import { Module } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turma } from './entities/turma.entity';
import { InstrutorModule } from 'src/modules/instrutor/instrutor.module';
import { UsuarioModule } from 'src/modules/usuario/usuario.module';
import { AlunoModule } from '../aluno/aluno.module';

@Module({
  controllers: [TurmaController],
  providers: [TurmaService],
  imports: [
    TypeOrmModule.forFeature([Turma]),
    InstrutorModule,
    UsuarioModule,
    AlunoModule
  ]
})
export class TurmaModule {}
