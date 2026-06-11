import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateResponsavelDto } from './create-responsavel.dto';

export class UpdateResponsavelDto extends PartialType(
  OmitType(CreateResponsavelDto, ['telefones'])) {
}
