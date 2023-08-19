import { EmployeesFilterDto } from 'src/usecases/employeesFilter/dto';

export function employeesFilterTest(pactum) {
  describe('employeesFilter', () => {
    it('should show list of filtered employees', () => {
      const employeesFilterDto: EmployeesFilterDto = {
        expertiseLevel: 5,
        availableHours: 0,
        skills: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        education: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        minimumExperienceYears: 0,
      };

      return pactum
        .spec()
        .post('/employeesFilter')
        .withBody({
          ...employeesFilterDto,
        })
        .expectStatus(200);
    });
  });
}
