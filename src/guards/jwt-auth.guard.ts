import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any): TUser {
    if (!user) throw new UnauthorizedException('Você precisa fazer login')

    return super.handleRequest(err, user, info, context, status)
  }
}