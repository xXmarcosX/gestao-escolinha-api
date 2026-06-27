import { PartialType } from '@nestjs/mapped-types';
import { CreateTelefoneResponsavelDto } from './create-telefone-responsavel.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTelefoneResponsavelDto extends PartialType(CreateTelefoneResponsavelDto) {}
