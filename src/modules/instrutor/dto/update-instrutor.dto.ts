import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateInstrutorDto } from './create-instrutor.dto';
import { UpdateUsuarioNestedDto } from 'src/modules/usuario/dto/update-usuario-nested.dto';
import { IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateInstrutorDto extends PartialType(
  OmitType(CreateInstrutorDto, ['usuario', 'telefones'])
) {

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUsuarioNestedDto)
  usuario?: UpdateUsuarioNestedDto
}
