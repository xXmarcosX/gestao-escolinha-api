import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException
} from '@nestjs/common';
import { JwtPayload } from 'src/models/jwt-payload';
import { isFuncionarioOrAdmin } from 'src/utils/is-funcionario-or-admin';

@Injectable()
export class SelfOrAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = request.params.id;

    if (isFuncionarioOrAdmin(user.role)) {
      return true;
    }

    if (String(user.sub) === String(resourceId)) {
      return true;
    }

    throw new ForbiddenException('Você não tem permissão para alterar ou excluir estes dados.');
  }
}