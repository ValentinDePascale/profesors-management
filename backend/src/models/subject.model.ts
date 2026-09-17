import { PrismaClient, Subject, Prisma } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const SubjectModel = {
  async findAll(): Promise<Subject[]> {
    return await prisma.subject.findMany({
      orderBy: { name: 'asc' },
    });
  },

  async findByCUPOF(CUPOF: number): Promise<Subject | null> {
    return await prisma.subject.findUnique({
      where: { CUPOF },
    });
  },

  async create(data: Prisma.SubjectCreateInput): Promise<Subject> {
    return await prisma.subject.create({
      data,
    });
  },

  async update(
    CUPOF: number,
    data: Prisma.SubjectUpdateInput
  ): Promise<Subject | null> {
    return await prisma.subject.update({
      where: { CUPOF },
      data,
    });
  },

  async delete(CUPOF: number): Promise<boolean> {
    try {
      await prisma.subject.delete({
        where: { CUPOF },
      });
      return true;
    } catch {
      return false;
    }
  },
};

export default SubjectModel;
