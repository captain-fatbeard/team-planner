import { Module } from '@nestjs/common';
import { HealthModule } from './usecases/health/module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './lib/prisma/prisma.module';
import { EmployeeModule } from './entities/employee/module';
import { EducationModule } from './entities/education/module';
import { ProjectModule } from './entities/project/module';
import { SkillModule } from './entities/skill/module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    EmployeeModule,
    EducationModule,
    ProjectModule,
    SkillModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
