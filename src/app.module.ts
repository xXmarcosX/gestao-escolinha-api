import { Module } from '@nestjs/common';
import { AlergiaModule } from './alergia/alergia.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/data-source';
import { UsuarioModule } from './usuario/usuario.module';
import { ResponsavelModule } from './responsavel/responsavel.module';
import { AuthModule } from './auth/auth.module';
import { TipoEventoMedicoModule } from './tipo-evento-medico/tipo-evento-medico.module';

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

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
