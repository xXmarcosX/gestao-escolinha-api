import { InternalServerErrorException, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { HashingService } from "./hashing/hashing.service";
import { BcryptHashingService } from "./hashing/bcrypt-hashing.service";
import { JwtStrategy } from "./jwt.strategy";
import { UsuarioModule } from "src/usuario/usuario.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptHashingService
    },
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [HashingService],
  imports: [
    UsuarioModule,
    
    JwtModule.registerAsync({
        useFactory: () => {
          const secret = process.env.JWT_SECRET_KEY
          const ttl = process.env.JWT_TTL

          if (!secret) throw new InternalServerErrorException('JWT_SECRET not found in .env')
          if (!ttl) throw new InternalServerErrorException('JWT_TTL not found in .env')

          return {
            secret: secret,
            signOptions: {expiresIn: (ttl || '1d') as any}
          }
        }
      })
  ]
})
export class AuthModule {}