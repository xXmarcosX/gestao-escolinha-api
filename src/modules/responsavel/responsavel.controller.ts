import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ResponsavelService } from './responsavel.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SelfOrAdminGuard } from 'src/common/guards/self-or-admin.guard';

@Controller('responsavel')
export class ResponsavelController {
  constructor(
    private readonly responsavelService: ResponsavelService,
  ) { }

  @Post()
  async create(@Body() createResponsavelDto: CreateResponsavelDto) {
    return await this.responsavelService.create(createResponsavelDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.responsavelService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.responsavelService.findOne(+id);
  }

  @Patch('v1/:id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateResponsavelDto: UpdateResponsavelDto) {
    return this.responsavelService.update(+id, updateResponsavelDto);
  }

  @UseGuards(JwtAuthGuard, SelfOrAdminGuard)
  @Patch('v2/me/:id')
  updateAuth(@Param('id', ParseIntPipe) id: string, @Body() updateResponsavelDto: UpdateResponsavelDto) {
    return this.responsavelService.update(+id, updateResponsavelDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.responsavelService.remove(+id);
  }
}
