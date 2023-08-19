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
import { SkillService } from './service';
import { SkillDto } from './dto';

@Controller('/skills')
@ApiTags('skills')
export class SkillController {
  constructor(private service: SkillService) {}

  @Post('')
  create(@Body() dto: SkillDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: SkillDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
