import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class EmployeeDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'Employee Name' })
  name: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ default: '2021-01-01' })
  employeeStartDate: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 10 })
  expertiseLevel: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 37 })
  availableHours: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  education: number;

  @IsNumber({}, { each: true })
  @ApiProperty({ default: [1, 2] })
  projects: number[];

  @IsNumber({}, { each: true })
  @ApiProperty({ default: [1, 2] })
  skills: number[];
}
