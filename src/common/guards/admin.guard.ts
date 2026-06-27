import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  ForbiddenException, 
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === 'ADMIN' || user.role === 'FUNCIONARIO') {
      return true;
    }

    throw new ForbiddenException('Você não tem permissão para alterar ou excluir estes dados.');
  }
}