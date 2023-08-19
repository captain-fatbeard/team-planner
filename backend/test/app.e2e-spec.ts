import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { PrismaService } from '../src/lib/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import {
  educationTest,
  employeeTest,
  projectTest,
  skillTest,
} from './entities';
import { healthTest } from './usecases';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();

    await app.listen(3333);

    prisma = app.get(PrismaService);

    await prisma.cleanDB();

    pactum.request.setBaseUrl('http://localhost:3333');
  });

  afterAll(() => {
    app.close();
  });

  describe('persistant test data', () => {
    it('should create persistant education', () => {
      return pactum
        .spec()
        .post('/educations')
        .withBody({
          name: 'persistant education name',
        })
        .expectStatus(201)
        .stores('persistantEducationId', 'id');
    });

    it('should create persistant project', () => {
      return pactum
        .spec()
        .post('/projects')
        .withBody({
          name: 'persistant project name',
        })
        .expectStatus(201)
        .stores('persistantProjectId', 'id');
    });

    it('should create persistant skill', () => {
      return pactum
        .spec()
        .post('/skills')
        .withBody({
          name: 'persistant skill name',
        })
        .expectStatus(201)
        .stores('persistantSkillId', 'id');
    });
  });

  describe('entities', () => {
    educationTest(pactum);
    employeeTest(pactum);
    projectTest(pactum);
    skillTest(pactum);
  });

  describe('usecases', () => {
    healthTest(pactum);
  });
});
