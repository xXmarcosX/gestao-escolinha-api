import { Injectable } from '@nestjs/common';
import { CreateMensalidadeDto } from './dto/create-mensalidade.dto';
import { UpdateMensalidadeDto } from './dto/update-mensalidade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Mensalidade } from './entities/mensalidade.entity';
import { Repository } from 'typeorm';
import { ResponsavelService } from '../responsavel/responsavel.service';
import { TipoPagamentoService } from '../tipo-pagamento/tipo-pagamento.service';

@Injectable()
export class MensalidadeService {
  constructor(
    @InjectRepository(Mensalidade)
    private readonly mensalidadeRepository: Repository<Mensalidade>,
    private readonly responsavelService: ResponsavelService,
    private readonly tipoPagamentoService: TipoPagamentoService
  ){}

  async create(dto: CreateMensalidadeDto) {
    const responsavel = await this.responsavelService.findOne(dto.responsavelId)

    const mensalidade = this.mensalidadeRepository.create({
      ...dto,
      dataEmissao: new Date(),
      isPaga: false,
      responsavel,
      tipoPagamento: null as any
    })

    return this.mensalidadeRepository.save(mensalidade)
  }

  findAllResponsavelMensalidades(idResponsavel: number) {
    return this.mensalidadeRepository.find({
      where: {
        responsavel:{
          id: idResponsavel
        }
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} mensalidade`;
  }

  update(id: number, updateMensalidadeDto: UpdateMensalidadeDto) {
    return `This action updates a #${id} mensalidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} mensalidade`;
  }
}
