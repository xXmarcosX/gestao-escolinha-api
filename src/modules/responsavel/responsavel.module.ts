import { forwardRef, Module } from '@nestjs/common';
import { ResponsavelService } from './responsavel.service';
import { ResponsavelController } from './responsavel.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Responsavel } from './entities/responsavel.entity';
import { UsuarioModule } from 'src/modules/usuario/usuario.module';
import { TelefoneResponsavelModule } from './telefone-responsavel/telefone-responsavel.module';
import { AuthModule } from '../auth/auth.module';
import { TicketModule } from '../ticket/ticket.module';
import { MensalidadeModule } from '../mensalidade/mensalidade.module';

@Module({
  controllers: [ResponsavelController],
  providers: [ResponsavelService],
  imports: [
    TypeOrmModule.forFeature([Responsavel]),
    UsuarioModule,
    TelefoneResponsavelModule,
    AuthModule,
    TicketModule,
    MensalidadeModule
  ],
  exports: [ResponsavelService]
})
export class ResponsavelModule {}
