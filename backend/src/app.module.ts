import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './lib/prisma/prisma.module';

import { EmployeeModule } from './entities/employee/module';
import { EducationModule } from './entities/education/module';
import { ProjectModule } from './entities/project/module';
import { SkillModule } from './entities/skill/module';

import { HealthModule } from './usecases/health/module';
import { EmployeesFilterModule } from './usecases/employeesFilter/module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HealthModule,
    EmployeeModule,
    EducationModule,
    ProjectModule,
    SkillModule,
    EmployeesFilterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
