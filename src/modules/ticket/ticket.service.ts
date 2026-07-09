import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { ResponsavelService } from '../responsavel/responsavel.service';
import { NewTicketDto } from './dto/new-ticket.dto';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    private readonly responsavelService: ResponsavelService
  ) { }

  async create(createTicketDto: CreateTicketDto, responsavelId: number) {
    const responsavel = await this.responsavelService.findOne(responsavelId)
    const novoTicket: NewTicketDto = {
      conteudo: createTicketDto.conteudo,
      isRespondido: false,
      responsavel
    }

    return this.ticketRepository.save(novoTicket)
  }

  findAll() {
    return this.ticketRepository.find({
      relations: {
        responsavel: {
          telefones: true,
          usuario: true,
          alunos: true
        }
      },
      select: {
        responsavel: {
          primeiroNome: true,
          sobrenome: true,
          usuario: {
            email: true
          },
          telefones: {
            numero: true
          },
          alunos: {
            primeiroNome: true,
            sobrenome: true
          }
        }
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
