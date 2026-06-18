import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UsuarioService } from "src/usuario/usuario.service";
import { HashingService } from "./hashing/hashing.service";
import { JwtService } from "@nestjs/jwt";
import { ResponsavelService } from "src/responsavel/responsavel.service";
import { FuncionarioService } from "src/funcionario/funcionario.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly responsavelService: ResponsavelService,
    private readonly funcionarioService: FuncionarioService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService
  ) { }

  async login(body: LoginDto) {
    const error = new UnauthorizedException('Usuário ou senha inválidos')
    let primeiroNomeUsuario = ''
    let sobrenomeUsuario = ''

    if (!body.email) throw new BadRequestException('Email está vazio')
    if (!body.senha) throw new BadRequestException('Senha está vazia')

    const user = await this.usuarioService.findOneByEmail(body.email)

    if (!user?.senha || !user.email) throw error

    const isPasswordValid = await this.hashingService.compare(body.senha, user.senha)

    if (!isPasswordValid) throw error

    switch (user.tipoPerfil) {
      case 'RESPONSAVEL':
        const responsavel = await this.responsavelService.findByUserId(user.id || -1)
        primeiroNomeUsuario = responsavel.primeiroNome || ''
        sobrenomeUsuario = responsavel.sobrenome || ''
        break

      case 'FUNCIONARIO':
        const funcionario = await this.funcionarioService.findByUserId(user.id || -1)
        primeiroNomeUsuario = funcionario.primeiroNome || ''
        sobrenomeUsuario = funcionario.sobrenome || ''
        break

      default:
        // Não deve nem ser possível chegar aqui
        throw new BadRequestException('Tipo de usuário inválido.')
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      primeiroNomeUsuario,
      sobrenomeUsuario,
      role: user.tipoPerfil
    })

    return { accessToken }
  }
}