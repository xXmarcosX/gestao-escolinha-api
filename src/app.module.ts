import { Module } from '@nestjs/common';
import { AlergiaModule } from './alergia/alergia.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/data-source';
import { UsuarioModule } from './usuario/usuario.module';
import { ResponsavelModule } from './responsavel/responsavel.module';
import { AuthModule } from './auth/auth.module';
import { TipoEventoMedicoModule } from './tipo-evento-medico/tipo-evento-medico.module';
import { TipoPagamentoModule } from './tipo-pagamento/tipo-pagamento.module';
import { LocalTreinoModule } from './local-treino/local-treino.module';

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

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
