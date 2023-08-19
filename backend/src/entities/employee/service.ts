import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EmployeeDto } from './dto';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: EmployeeDto) {
    try {
      const object = await this.prisma.employee.create({
        data: {
          name: dto.name,
          employeeStartDate: dto.employeeStartDate,
          expertiseLevel: dto.expertiseLevel,
          availableHours: dto.availableHours,
          education: {
            connect: { id: dto.education },
          },
          projects: {
            connect: dto.projects.map((id) => ({ id })),
          },
          skills: {
            connect: dto.skills.map((id) => ({ id })),
          },
        },
      });

      return object;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Duplicate employee');
        }
      }
    }
  }

  async list() {
    const objects = await this.prisma.employee.findMany();

    return objects;
  }

  async show(id: number) {
    const object = await this.prisma.employee.findUnique({
      where: {
        id: id,
      },
      include: {
        education: {
          select: {
            id: true,
            name: true,
          },
        },
        projects: {
          select: {
            id: true,
            name: true,
          },
        },
        skills: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!object) {
      throw new NotFoundException();
    }

    return object;
  }

  async update(id: number, dto: EmployeeDto) {
    const object = await this.prisma.employee.update({
      where: { id: Number(id) },
      data: {
        name: dto.name,
        employeeStartDate: dto.employeeStartDate,
        expertiseLevel: dto.expertiseLevel,
        availableHours: dto.availableHours,
        education: {
          connect: { id: dto.education },
        },
        projects: {
          connect: dto.projects.map((id) => ({ id })),
        },
        skills: {
          connect: dto.skills.map((id) => ({ id })),
        },
      },
    });
    return object;
  }

  async delete(id: number) {
    await this.prisma.employee.delete({ where: { id: Number(id) } });

    return { message: `employee ${id} is deleted` };
  }
}
