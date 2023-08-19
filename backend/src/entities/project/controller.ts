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
import { ProjectService } from './service';
import { ProjectDto } from './dto';

@Controller('/projects')
@ApiTags('projects')
export class ProjectController {
  constructor(private service: ProjectService) {}

  @Post('')
  create(@Body() dto: ProjectDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: ProjectDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
