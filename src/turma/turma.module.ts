import { Module } from '@nestjs/common';
import { TurmaService } from './turma.service';
import { TurmaController } from './turma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turma } from './entities/turma.entity';
import { InstrutorModule } from 'src/instrutor/instrutor.module';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  controllers: [TurmaController],
  providers: [TurmaService],
  imports: [
    TypeOrmModule.forFeature([Turma]),
    InstrutorModule,
    UsuarioModule
  ]
})
export class TurmaModule {}
