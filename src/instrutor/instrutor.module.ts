import { forwardRef, Module } from '@nestjs/common';
import { InstrutorService } from './instrutor.service';
import { InstrutorController } from './instrutor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instrutor } from './entities/instrutor.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [InstrutorController],
  providers: [InstrutorService],
  imports: [
    TypeOrmModule.forFeature([Instrutor]),
    UsuarioModule,
    forwardRef(() => AuthModule) 
  ],
  exports: [
    InstrutorService
  ]
})
export class InstrutorModule {}
