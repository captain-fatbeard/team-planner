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
import { EmployeeService } from './service';
import { EmployeeDto } from './dto';

@Controller('/employees')
@ApiTags('employees')
export class EmployeeController {
  constructor(private service: EmployeeService) {}

  @Post('')
  create(@Body() dto: EmployeeDto) {
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
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: EmployeeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
