import { PrismaClient, Profesor, Prisma } from '@prisma/client';


const prisma = new PrismaClient();


export const ProfesorModel = {
    async findAll(): Promise<Profesor[]> {
        return await prisma.profesor.findMany({
            orderBy: { surname: 'asc' },
        });
    },

    async findById(id: number): Promise<Profesor | null> {
        return await prisma.profesor.findUnique({
            where: { id },
        });
    },
    async findByDNI(dni: string): Promise<Profesor | null> {
        return await prisma.profesor.findUnique({
            where: { dni },
        });
    },
    
    async create(data: Prisma.ProfesorCreateImput): Promise<Profesor> {
        return await prisma.profesor.create({
            data,
        });
    },
    async update(id: number, data: Prisma.ProfesorUpdateInput): Promise<Profesor | null>{
    try{
        return await prisma.profesor.update({
            where: { id },
            data,
        });
    } catch {
        return null;
        }
    },
    async delete(id: number): Promise<boolean> {
        try {
        await prisma.profesor.delete({
            where: { id },
        });
        return true;
        } catch {
        return false; 
        }
    },
};

  

