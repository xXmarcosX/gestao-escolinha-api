import { forwardRef, Module } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { UsuarioModule } from 'src/modules/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [FuncionarioController],
  providers: [FuncionarioService],
  imports: [
    TypeOrmModule.forFeature([Funcionario]),
    UsuarioModule,
    forwardRef(() => AuthModule)
  ],
  exports: [FuncionarioService]
})
export class FuncionarioModule {}
