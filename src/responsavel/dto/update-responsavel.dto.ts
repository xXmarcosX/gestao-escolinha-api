import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateResponsavelDto } from './create-responsavel.dto';
import { UpdateUsuarioNestedDto } from 'src/usuario/dto/update-usuario-nested.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateResponsavelDto extends PartialType(
  OmitType(CreateResponsavelDto, ['telefones', 'usuario'])) {

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUsuarioNestedDto)
  usuario?: UpdateUsuarioNestedDto
}
