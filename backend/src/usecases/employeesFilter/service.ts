import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { EmployeesFilterDto } from './dto';

@Injectable()
export class EmployeesFilterService {
  constructor(private prisma: PrismaService) {}

  async employeesFilter(dto: EmployeesFilterDto) {
    const object = await this.prisma.employee.findMany({
      where: {
        employeeStartDate: {
          lte: new Date(
            new Date().getFullYear() - dto.minimumExperienceYears,
            0,
            1,
          ).toISOString(),
        },
        expertiseLevel: {
          gte: dto.expertiseLevel,
        },
        availableHours: {
          gte: dto.availableHours,
        },
        education: {
          id: {
            in: dto.education,
          },
        },
        skills: {
          some: {
            id: {
              in: dto.skills,
            },
          },
        },
      },
      include: {
        education: {
          select: {
            name: true,
          },
        },
        projects: {
          select: {
            name: true,
          },
        },
        skills: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!object) {
      throw new NotFoundException();
    }

    return object.map((e) => {
      return {
        ...e,
        education: e.education.name,
        projects: e.projects.map((p) => p.name),
        skills: e.skills.map((s) => s.name),
        yearsOfExperience:
          new Date().getFullYear() -
          new Date(e.employeeStartDate).getFullYear(),
      };
    });
  }
}
