import { Module } from '@nestjs/common';
import { AlergiaModule } from './alergia/alergia.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/data-source';
import { UsuarioModule } from './usuario/usuario.module';
import { ResponsavelModule } from './responsavel/responsavel.module';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRoot(dataSourceOptions),

    // módulos
    AlergiaModule,
    UsuarioModule,
    ResponsavelModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
