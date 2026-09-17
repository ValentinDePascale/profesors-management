import { PrismaClient, License, Prisma } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const LicenseModel = {
  async findAll(): Promise<License[]> {
    return await prisma.license.findMany({
      orderBy: { articleCode: 'asc' },
    });
  },

  async findById(id: number): Promise<License | null> {
    return await prisma.license.findUnique({
      where: { id },
    });
  },
  async create(data: Prisma.LicenseCreateInput): Promise<License> {
    return await prisma.license.create({
      data,
    });
  },
  async update(
    id: number,
    data: Prisma.LicenseUpdateInput
  ): Promise<License | null> {
    return await prisma.license.update({
      where: { id },
      data,
    });
  },

  async delete(id: number): Promise<boolean> {
    try {
      await prisma.license.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  },
};

export default LicenseModel;
