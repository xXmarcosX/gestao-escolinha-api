import { PartialType } from "@nestjs/mapped-types";
import { CreateTelefoneInstrutorDto } from "./create-telefone-instrutor.dto";

export class UpdateTelefoneInstrutorDto extends PartialType(CreateTelefoneInstrutorDto) {}