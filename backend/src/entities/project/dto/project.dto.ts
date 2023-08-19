import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProjectDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
