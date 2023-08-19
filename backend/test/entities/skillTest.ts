import { SkillDto } from 'src/entities/skill/dto';

export function skillTest(pactum) {
  describe('skills', () => {
    const createDto: SkillDto = {
      name: 'skill name',
    };

    const updateDto: SkillDto = {
      name: 'skill new name',
    };

    it('should not create with empty body', () => {
      return pactum.spec().post('/skills').withBody({}).expectStatus(400);
    });

    it('should create with correct dto', () => {
      return pactum
        .spec()
        .post('/skills')
        .withBody({
          ...createDto,
        })
        .expectStatus(201)
        .stores('skillId', 'id');
    });

    it('should show all', () => {
      return pactum.spec().get('/skills').expectStatus(200);
    });

    it('should not show 1 with incorrect param', () => {
      return pactum.spec().get('/skills/666').expectStatus(404);
    });

    it('should show 1 with correct param', () => {
      return pactum.spec().get('/skills/$S{skillId}').expectStatus(200);
    });

    it('should update', () => {
      return pactum
        .spec()
        .put('/skills/$S{skillId}')
        .withBody(updateDto)
        .expectStatus(200);
    });

    it('should delete', () => {
      return pactum.spec().delete('/skills/$S{skillId}').expectStatus(200);
    });
  });
}
