import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { ResponsavelService } from '../responsavel/responsavel.service';
import { NewTicketDto } from './dto/new-ticket.dto';
import { AnswerTicketDto } from './dto/answer-ticket.dto';
import { FuncionarioService } from '../funcionario/funcionario.service';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,

    private readonly responsavelService: ResponsavelService,
    private readonly funcionarioService: FuncionarioService
  ) { }

  async create(createTicketDto: CreateTicketDto, responsavelId: number) {
    const responsavel = await this.responsavelService.findOne(responsavelId)
    const novoTicket: NewTicketDto = {
      assunto: createTicketDto.assunto,
      conteudo: createTicketDto.conteudo,
      isRespondido: false,
      responsavel
    }

    return this.ticketRepository.save(novoTicket)
  }

  findAll(respondido: boolean) {
    return this.ticketRepository.find({
      relations: {
        responsavel: {
          telefones: true,
          usuario: true,
          alunos: true
        }
      },
      where: {
        isRespondido: respondido
      },
    })
  }

  async findOne(id: number) {
    const ticket = await this.ticketRepository.findOne({
      where: { id },
      relations: {
        responsavel: {
          telefones: true,
          usuario: true,
          alunos: true,
        },
        funcionario: true
      },
      select: {
        funcionario: {
          primeiroNome: true,
          sobrenome: true
        },
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

    if (!ticket) {
      throw new NotFoundException('Ticket não encontrado.')
    }

    return ticket
  }

  async update(updateTicketDto: UpdateTicketDto, idResponsavel: number, id: number) {
    if (!updateTicketDto) throw new BadRequestException('Dados não enviados.')

    const ticketAtualizado = await this.ticketRepository.preload({
      id,
      ...updateTicketDto,
      responsavel: {
        id: idResponsavel
      }
    })

    if (!ticketAtualizado) throw new NotFoundException('Ticket não encontrado.')

    await this.ticketRepository.save(ticketAtualizado)

    return this.findOne(id)
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }

  async answerTicket(id: number, answerTicketDto: AnswerTicketDto, idFuncionario: number) {
    if (!answerTicketDto) throw new BadRequestException('Dados não enviados.')

    const funcionario = await this.funcionarioService.findOne(idFuncionario)

    const ticket = await this.ticketRepository.preload({
      id,
      ...answerTicketDto,
      isRespondido: true,
      dataResposta: new Date(),
      funcionario
    })

    if (!ticket) throw new NotFoundException('Ticket não encontrado.')

    return this.ticketRepository.save(ticket)
  }
}
