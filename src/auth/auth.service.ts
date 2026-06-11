import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UsuarioService } from "src/usuario/usuario.service";
import { HashingService } from "./hashing/hashing.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService
  ) { }

  async login(body: LoginDto) {
    const error = new UnauthorizedException('Usuário ou senha inválidos')

    if (!body.email) throw new BadRequestException('Email está vazio')
    if (!body.senha) throw new BadRequestException('Email está vazio')

    const user = await this.usuarioService.findOneByEmail(body.email)

    if (!user?.senha || !user.email) throw error

    const isPasswordValid = await this.hashingService.compare(body.senha, user.senha)

    if (!isPasswordValid) throw error

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.tipoPerfil
    })

    await this.usuarioService.save(user)

    return { accessToken }
  }
}