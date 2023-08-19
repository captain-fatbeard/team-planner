import { Module } from '@nestjs/common';
import { EmployeesFilterController } from './controller';
import { EmployeesFilterService } from './service';

@Module({
  controllers: [EmployeesFilterController],
  providers: [EmployeesFilterService],
})
export class EmployeesFilterModule {}
