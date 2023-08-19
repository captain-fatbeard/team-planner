import { Module } from '@nestjs/common';
import { ProjectService } from './service';
import { ProjectController } from './controller';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
