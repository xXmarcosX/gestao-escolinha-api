import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTelefoneInstrutorDto } from "./dto/create-telefone-instrutor.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TelefoneInstrutor } from "./entities/telefone-instrutor.entity";
import { Repository } from "typeorm";
import { UpdateTelefoneInstrutorDto } from "./dto/update-telefone-instrutor.dto";

@Injectable()
export class TelefoneInstrutorService {
  constructor(
    @InjectRepository(TelefoneInstrutor)
    private readonly telefoneInstrutorRepository: Repository<TelefoneInstrutor>
  ){}

  async create(createTelefoneResponsavelDto: CreateTelefoneInstrutorDto): Promise<TelefoneInstrutor> {
    const telefone = this.telefoneInstrutorRepository.create(createTelefoneResponsavelDto);
    return await this.telefoneInstrutorRepository.save(telefone);
  }

  async findAll(): Promise<TelefoneInstrutor[]> {
    return await this.telefoneInstrutorRepository.find();
  }

  async findOne(id: number) {
    const telefone = await this.telefoneInstrutorRepository.findOne({ where: { id } });
    if (!telefone) {
      throw new NotFoundException(`Telefone com ID #${id} não encontrado`);
    }
    return telefone;
  }

  async update(id: number, updateTelefoneResponsavelDto: UpdateTelefoneInstrutorDto) {
    const telefone = await this.findOne(id);
    Object.assign(telefone, updateTelefoneResponsavelDto);
    return await this.telefoneInstrutorRepository.save(telefone);
  }

  async remove(id: number) {
    const telefone = await this.findOne(id);
    return await this.telefoneInstrutorRepository.remove(telefone);
  }
}