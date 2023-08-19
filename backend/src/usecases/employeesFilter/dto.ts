import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class EmployeesFilterDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ default: 5 })
  expertiseLevel: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ default: 0 })
  availableHours: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ default: 0 })
  minimumExperienceYears: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  @ApiProperty({ default: 1 })
  education: number[];

  @IsOptional()
  @IsNumber({}, { each: true })
  @ApiProperty({ default: [] })
  skills: number[];
}
