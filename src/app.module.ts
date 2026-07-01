import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/data-source';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { ResponsavelModule } from './modules/responsavel/responsavel.module';
import { TipoEventoMedicoModule } from './modules/tipo-evento-medico/tipo-evento-medico.module';
import { TipoPagamentoModule } from './modules/tipo-pagamento/tipo-pagamento.module';
import { LocalTreinoModule } from './modules/local-treino/local-treino.module';
import { FuncionarioModule } from './modules/funcionario/funcionario.module';
import { InstrutorModule } from './modules/instrutor/instrutor.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { TurmaModule } from './modules/turma/turma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AlergiaModule } from './modules/alergia/alergia.module';
import { FichaMedicaAlunoModule } from './modules/ficha-medica-aluno/ficha-medica-aluno.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRoot(dataSourceOptions),

    // módulos
    AlergiaModule,
    AuthModule,
    UsuarioModule,
    ResponsavelModule,
    TipoEventoMedicoModule,
    TipoPagamentoModule,
    LocalTreinoModule,
    FuncionarioModule,
    InstrutorModule,
    AlunoModule,
    TurmaModule,
    FichaMedicaAlunoModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
