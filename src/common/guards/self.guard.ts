import { 
  Injectable, 
  CanActivate, 
  ExecutionContext, 
  ForbiddenException, 
} from '@nestjs/common';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = request.params.id; 

    if (String(user.sub) === String(resourceId)) {
      return true;
    }

    throw new ForbiddenException('Você não tem permissão para alterar ou excluir estes dados.');
  }
}