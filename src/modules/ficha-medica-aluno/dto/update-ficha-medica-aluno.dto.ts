import { PartialType } from '@nestjs/mapped-types';
import { CreateFichaMedicaAlunoDto } from './create-ficha-medica-aluno.dto';

export class UpdateFichaMedicaAlunoDto extends PartialType(CreateFichaMedicaAlunoDto) {}
