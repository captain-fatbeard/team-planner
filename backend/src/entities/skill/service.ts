import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SkillDto } from './dto';
import { PrismaService } from '../../lib/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  async create(dto: SkillDto) {
    try {
      const object = await this.prisma.skill.create({
        data: {
          name: dto.name,
        },
      });

      return object;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Duplicate skill');
        }
      }
    }
  }

  async list() {
    const objects = await this.prisma.skill.findMany();

    return objects;
  }

  async show(id: number) {
    const object = await this.prisma.skill.findUnique({
      where: {
        id: id,
      },
    });

    if (!object) {
      throw new NotFoundException();
    }

    return object;
  }

  async update(id: number, dto: SkillDto) {
    const object = await this.prisma.skill.update({
      where: { id: Number(id) },
      data: dto,
    });

    return object;
  }

  async delete(id: number) {
    await this.prisma.skill.delete({ where: { id: Number(id) } });

    return { message: `skill ${id} is deleted` };
  }
}
