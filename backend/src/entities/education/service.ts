import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EducationDto } from './dto';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  async create(dto: EducationDto) {
    try {
      const object = await this.prisma.education.create({
        data: {
          name: dto.name,
        },
      });

      return object;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Duplicate education');
        }
      }
    }
  }

  async list() {
    const objects = await this.prisma.education.findMany();

    return objects;
  }

  async show(id: number) {
    const object = await this.prisma.education.findUnique({
      where: {
        id: id,
      },
    });

    if (!object) {
      throw new NotFoundException();
    }

    return object;
  }

  async update(id: number, dto: EducationDto) {
    const object = await this.prisma.education.update({
      where: { id: Number(id) },
      data: dto,
    });

    return object;
  }

  async delete(id: number) {
    await this.prisma.education.delete({ where: { id: Number(id) } });

    return { message: `education ${id} is deleted` };
  }
}
