import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { UsuarioService } from "src/modules/usuario/usuario.service";
import { HashingService } from "./hashing/hashing.service";
import { JwtService } from "@nestjs/jwt";
import { ResponsavelService } from "src/modules/responsavel/responsavel.service";
import { FuncionarioService } from "src/modules/funcionario/funcionario.service";
import { InstrutorService } from "src/modules/instrutor/instrutor.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,

    private readonly responsavelService: ResponsavelService,
    private readonly funcionarioService: FuncionarioService,
    private readonly instrutorService: InstrutorService,

    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService
  ) { }

  async login(body: LoginDto) {
    const error = new UnauthorizedException('Usuário ou senha inválidos')
    const jwtData = {
      sub: 0,
      primeiroNomeUsuario: '',
      sobrenomeUsuario: ''
    }

    if (!body.email) throw new BadRequestException('Email está vazio')
    if (!body.senha) throw new BadRequestException('Senha está vazia')

    const user = await this.usuarioService.findOneByEmail(body.email)

    if (!user?.senha || !user.email) throw error

    const isPasswordValid = await this.hashingService.compare(body.senha, user.senha)

    if (!isPasswordValid) throw error

    switch (user.tipoPerfil) {
      case 'RESPONSAVEL':
        const responsavel = await this.responsavelService.findByUserId(user.id)
        jwtData.primeiroNomeUsuario = responsavel.primeiroNome 
        jwtData.sobrenomeUsuario = responsavel.sobrenome 
        jwtData.sub = responsavel.id
        break

      case 'FUNCIONARIO':
        const funcionario = await this.funcionarioService.findByUserId(user.id)
        jwtData.primeiroNomeUsuario = funcionario.primeiroNome 
        jwtData.sobrenomeUsuario = funcionario.sobrenome 
        jwtData.sub = funcionario.id 
        break

      case 'INSTRUTOR':
        const instrutor = await this.instrutorService.findByUserId(user.id)
        jwtData.primeiroNomeUsuario = instrutor.primeiroNome 
        jwtData.sobrenomeUsuario = instrutor.sobrenome 
        jwtData.sub = instrutor.id 
        break

      default:
        // Não deve nem ser possível chegar aqui
        throw new BadRequestException('Tipo de usuário inválido.')
    }

    const accessToken = await this.jwtService.signAsync({
      ...jwtData,
      email: user.email,
      role: user.tipoPerfil
    })

    return { accessToken }
  }
}