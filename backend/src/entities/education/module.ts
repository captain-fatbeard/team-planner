import { Module } from '@nestjs/common';
import { EducationController } from './controller';
import { EducationService } from './service';

@Module({
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule {}
