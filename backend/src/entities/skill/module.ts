import { Module } from '@nestjs/common';
import { SkillService } from './service';
import { SkillController } from './controller';

@Module({
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule {}
