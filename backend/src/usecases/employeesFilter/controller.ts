import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { EmployeesFilterDto } from './dto';
import { EmployeesFilterService } from './service';

@Controller('employeesFilter')
export class EmployeesFilterController {
  constructor(private service: EmployeesFilterService) {}

  @Post('')
  @HttpCode(200)
  employeesFilter(@Body() dto: EmployeesFilterDto) {
    return this.service.employeesFilter(dto);
  }
}
