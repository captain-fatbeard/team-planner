import { EducationDto } from 'src/entities/education/dto';

export function educationTest(pactum) {
  describe('educations', () => {
    const createDto: EducationDto = {
      name: 'education name',
    };

    const updateDto: EducationDto = {
      name: 'education new name',
    };

    it('should not create with empty body', () => {
      return pactum.spec().post('/educations').withBody({}).expectStatus(400);
    });

    it('should create with correct dto', () => {
      return pactum
        .spec()
        .post('/educations')
        .withBody({
          ...createDto,
        })
        .expectStatus(201)
        .stores('educationId', 'id');
    });

    it('should show all', () => {
      return pactum.spec().get('/educations').expectStatus(200);
    });

    it('should not show 1 with incorrect param', () => {
      return pactum.spec().get('/educations/666').expectStatus(404);
    });

    it('should show 1 with correct param', () => {
      return pactum.spec().get('/educations/$S{educationId}').expectStatus(200);
    });

    it('should update', () => {
      return pactum
        .spec()
        .put('/educations/$S{educationId}')
        .withBody(updateDto)
        .expectStatus(200);
    });

    it('should delete', () => {
      return pactum
        .spec()
        .delete('/educations/$S{educationId}')
        .expectStatus(200);
    });
  });
}
