import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SkillDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
