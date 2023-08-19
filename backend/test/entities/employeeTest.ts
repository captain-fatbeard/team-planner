import { EmployeeDto } from 'src/entities/employee/dto';

export function employeeTest(pactum) {
  describe('employees', () => {
    const createDto: EmployeeDto = {
      name: 'Anders And',
      employeeStartDate: '2021-01-01',
      expertiseLevel: 1,
      education: null,
      availableHours: 37,
      projects: null,
      skills: null,
    };

    const updateDto: EmployeeDto = {
      name: 'Ander middleName And',
      employeeStartDate: '2021-01-01',
      expertiseLevel: 2,
      education: null,
      availableHours: 37,
      projects: null,
      skills: null,
    };

    it('should not create with empty body', () => {
      return pactum.spec().post('/employees').withBody({}).expectStatus(400);
    });

    it('should create with correct dto', () => {
      return pactum
        .spec()
        .post('/employees')
        .withBody({
          ...createDto,
          education: '$S{persistantEducationId}',
          projects: ['$S{persistantProjectId}'],
          skills: ['$S{persistantSkillId}'],
        })
        .expectStatus(201)
        .stores('employeeId', 'id');
    });

    it('should show all', () => {
      return pactum.spec().get('/employees').expectStatus(200);
    });

    it('should not show 1 with incorrect param', () => {
      return pactum.spec().get('/employees/666').expectStatus(404);
    });

    it('should show 1 with correct param', () => {
      return pactum.spec().get('/employees/$S{employeeId}').expectStatus(200);
    });

    it('should update', () => {
      return pactum
        .spec()
        .put('/employees/$S{employeeId}')
        .withBody({
          ...updateDto,
          education: '$S{persistantEducationId}',
          projects: ['$S{persistantProjectId}'],
          skills: ['$S{persistantSkillId}'],
        })
        .expectStatus(200);
    });

    it('should delete', () => {
      return pactum
        .spec()
        .delete('/employees/$S{employeeId}')
        .expectStatus(200);
    });
  });
}
