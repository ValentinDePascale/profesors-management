import {
  PrismaClient,
  LicenseType,
  Prisma,
} from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const LicenseTypeModel = {
  async findAll(): Promise<LicenseType[]> {
    return await prisma.licenseType.findMany({
      orderBy: { article: 'asc' },
    });
  },

  async findByArticle(article: string): Promise<LicenseType | null> {
    return await prisma.licenseType.findUnique({
      where: { article },
    });
  },

  async create(data: Prisma.LicenseTypeCreateInput): Promise<LicenseType> {
    return await prisma.licenseType.create({
      data,
    });
  },

  async update(
    article: string,
    data: Prisma.LicenseTypeUpdateInput
  ): Promise<LicenseType | null> {
    return await prisma.licenseType.update({
      where: { article },
      data,
    });
  },

  async delete(article: string): Promise<boolean> {
    try {
      await prisma.licenseType.delete({
        where: { article },
      });
      return true;
    } catch {
      return false;
    }
  },
};

export default LicenseTypeModel;
