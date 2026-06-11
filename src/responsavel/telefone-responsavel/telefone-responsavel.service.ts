import { InjectRepository } from "@nestjs/typeorm";
import { TelefoneResponsavel } from "./entities/telefone-responsavel.entity";
import { Repository } from "typeorm";
import { CreateTelefoneResponsavelDto } from "./dto/create-telefone-responsavel.dto";
import { UpdateTelefoneResponsavelDto } from "./dto/update-telefone-responsavel.dto";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class TelefoneResponsavelService {
  constructor(
    @InjectRepository(TelefoneResponsavel)
    private readonly telefoneResponsavelRepository: Repository<TelefoneResponsavel>
  ) { }

  async create(createTelefoneResponsavelDto: CreateTelefoneResponsavelDto): Promise<TelefoneResponsavel> {
    const telefone = this.telefoneResponsavelRepository.create(createTelefoneResponsavelDto);
    return await this.telefoneResponsavelRepository.save(telefone);
  }

  async findAll(): Promise<TelefoneResponsavel[]> {
    return await this.telefoneResponsavelRepository.find();
  }

  async findOne(id: number) {
    const telefone = await this.telefoneResponsavelRepository.findOne({ where: { id } });
    if (!telefone) {
      throw new NotFoundException(`Telefone com ID #${id} não encontrado`);
    }
    return telefone;
  }

  async update(id: number, updateTelefoneResponsavelDto: UpdateTelefoneResponsavelDto) {
    const telefone = await this.findOne(id);
    Object.assign(telefone, updateTelefoneResponsavelDto);
    return await this.telefoneResponsavelRepository.save(telefone);
  }

  async remove(id: number) {
    const telefone = await this.findOne(id);
    return await this.telefoneResponsavelRepository.remove(telefone);
  }
}