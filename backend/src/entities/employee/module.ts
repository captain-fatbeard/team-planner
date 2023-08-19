import { Module } from '@nestjs/common';
import { EmployeeController } from './controller';
import { EmployeeService } from './service';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
