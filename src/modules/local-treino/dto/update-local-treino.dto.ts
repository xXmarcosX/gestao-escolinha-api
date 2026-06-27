import { PartialType } from '@nestjs/mapped-types';
import { CreateLocalTreinoDto } from './create-local-treino.dto';

export class UpdateLocalTreinoDto extends PartialType(CreateLocalTreinoDto) {}
