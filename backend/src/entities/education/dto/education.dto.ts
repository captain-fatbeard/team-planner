import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EducationDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
