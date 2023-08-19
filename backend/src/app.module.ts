import { Module } from '@nestjs/common';
import { HealthModule } from './usecases/health/module';

@Module({
  imports: [HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
