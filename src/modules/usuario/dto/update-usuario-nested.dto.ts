import { OmitType, PartialType } from "@nestjs/mapped-types";
import { CreateUsuarioDto } from "./create-usuario.dto";

export class UpdateUsuarioNestedDto extends PartialType(
  OmitType(CreateUsuarioDto, ['email', 'senha']) 
) {}