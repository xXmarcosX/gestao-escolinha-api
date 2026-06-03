import { Module } from '@nestjs/common';
import { AlergiaModule } from './alergia/alergia.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/data-source';

@Module({
  imports: [
    AlergiaModule,
  
    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRoot(dataSourceOptions)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
