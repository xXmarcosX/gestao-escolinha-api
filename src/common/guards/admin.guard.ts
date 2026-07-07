import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  ForbiddenException, 
} from '@nestjs/common';
import { isFuncionarioOrAdmin } from 'src/utils/is-funcionario-or-admin';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (isFuncionarioOrAdmin(user.role)) {
      return true;
    }

    throw new ForbiddenException('Você não tem permissão para alterar ou excluir estes dados.');
  }
}