import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AlunoService } from 'src/modules/aluno/aluno.service';

@Injectable()
export class ResponsavelAlunoGuard implements CanActivate {
  constructor
    (
      private readonly alunoService: AlunoService
    ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = request.params.id;
    const aluno = await this.alunoService.findOne(resourceId)

    if (user.role === 'ADMIN' || user.role === 'FUNCIONARIO') {
      return true;
    }

    if (aluno.responsavel.id === user.sub) {
      return true;
    }

    throw new ForbiddenException('Você não tem permissão para alterar ou excluir estes dados.');
  }
}