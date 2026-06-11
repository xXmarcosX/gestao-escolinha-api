import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { ResponsavelService } from './responsavel.service';
import { CreateResponsavelDto } from './dto/create-responsavel.dto';
import { UpdateResponsavelDto } from './dto/update-responsavel.dto';

@Controller('responsavel')
export class ResponsavelController {
  constructor(private readonly responsavelService: ResponsavelService) { }

  @Post()
  create(@Body() createResponsavelDto: CreateResponsavelDto) {
    return this.responsavelService.create(createResponsavelDto);
  }
  
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.responsavelService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responsavelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResponsavelDto: UpdateResponsavelDto) {
    return this.responsavelService.update(+id, updateResponsavelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responsavelService.remove(+id);
  }
}
