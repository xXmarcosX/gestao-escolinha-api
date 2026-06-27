import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateFuncionarioDto } from './create-funcionario.dto';
import { UpdateUsuarioNestedDto } from 'src/modules/usuario/dto/update-usuario-nested.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateFuncionarioDto extends PartialType(
  OmitType(CreateFuncionarioDto, ['usuario'])) {

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUsuarioNestedDto)
  usuario?: UpdateUsuarioNestedDto
}
