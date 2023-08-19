import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EducationService } from './service';
import { EducationDto } from './dto';

@Controller('/educations')
@ApiTags('educations')
export class EducationController {
  constructor(private service: EducationService) {}

  @Post('')
  create(@Body() dto: EducationDto) {
    return this.service.create(dto);
  }

  @Get('')
  list() {
    return this.service.list();
  }

  @Get(':id')
  show(@Param('id', ParseIntPipe) id: number) {
    return this.service.show(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: EducationDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
