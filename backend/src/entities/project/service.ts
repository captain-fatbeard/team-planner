import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProjectDto } from './dto';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(dto: ProjectDto) {
    try {
      const object = await this.prisma.project.create({
        data: {
          name: dto.name,
        },
      });

      return object;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Duplicate project');
        }
      }
    }
  }

  async list() {
    const objects = await this.prisma.project.findMany();

    return objects;
  }

  async show(id: number) {
    const object = await this.prisma.project.findUnique({
      where: {
        id: id,
      },
    });

    if (!object) {
      throw new NotFoundException();
    }

    return object;
  }

  async update(id: number, dto: ProjectDto) {
    const object = await this.prisma.project.update({
      where: { id: Number(id) },
      data: dto,
    });

    return object;
  }

  async delete(id: number) {
    await this.prisma.project.delete({ where: { id: Number(id) } });

    return { message: `project ${id} is deleted` };
  }
}
