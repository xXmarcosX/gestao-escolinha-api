import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoPagamentoDto } from './dto/create-tipo-pagamento.dto';
import { UpdateTipoPagamentoDto } from './dto/update-tipo-pagamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoPagamento } from './entities/tipo-pagamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TipoPagamentoService {
  constructor(
    @InjectRepository(TipoPagamento) private readonly tipoPagamentoRepository: Repository<TipoPagamento>
  ) { }

  async create(createTipoPagamentoDto: CreateTipoPagamentoDto) {
  const tipoPagamento = this.tipoPagamentoRepository.create(createTipoPagamentoDto)

    return await this.tipoPagamentoRepository.save(tipoPagamento)
  }

  findAll() {
    return this.tipoPagamentoRepository.find();
  }

  async findOne(id: number) {
    const tipoPagamento = await this.tipoPagamentoRepository.findOneBy({ id });
    if (!tipoPagamento) {
      throw new NotFoundException('Tipo de pagamento não encontrado');
    }
    return tipoPagamento;
  }

  async update(id: number, updateTipoPagamentoDto: UpdateTipoPagamentoDto) {
    const tipoPagamento = await this.tipoPagamentoRepository.preload({
      id: id,
      ...updateTipoPagamentoDto
    })

    if (!tipoPagamento) throw new NotFoundException(`Tipo de pagamento com ${id} id não cadastrado`)

    return this.tipoPagamentoRepository.save(tipoPagamento)
  }

  async remove(id: number) {
    const tipoPagamento = await this.findOne(id)

    return this.tipoPagamentoRepository.delete(tipoPagamento)
  }
}
