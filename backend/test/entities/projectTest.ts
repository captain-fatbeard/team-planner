import { ProjectDto } from 'src/entities/project/dto';

export function projectTest(pactum) {
  describe('projects', () => {
    const createDto: ProjectDto = {
      name: 'Project name',
    };

    const updateDto: ProjectDto = {
      name: 'Project new name',
    };

    it('should not create with empty body', () => {
      return pactum.spec().post('/projects').withBody({}).expectStatus(400);
    });

    it('should create with correct dto', () => {
      return pactum
        .spec()
        .post('/projects')
        .withBody({
          ...createDto,
        })
        .expectStatus(201)
        .stores('projectId', 'id');
    });

    it('should show all', () => {
      return pactum.spec().get('/projects').expectStatus(200);
    });

    it('should not show 1 with incorrect param', () => {
      return pactum.spec().get('/projects/666').expectStatus(404);
    });

    it('should show 1 with correct param', () => {
      return pactum.spec().get('/projects/$S{projectId}').expectStatus(200);
    });

    it('should update', () => {
      return pactum
        .spec()
        .put('/projects/$S{projectId}')
        .withBody(updateDto)
        .expectStatus(200);
    });

    it('should delete', () => {
      return pactum.spec().delete('/projects/$S{projectId}').expectStatus(200);
    });
  });
}
