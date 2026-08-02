import { Request, Response, NextFunction  } from 'express';
import { Profesor } from '../models';


export async function getProfesors(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void>{
    try{
        const profesor = await Profesor.findAll();
        res.json(profesor)
    } catch (error){
        next(error)
    }
    
}

export async function getProfesorsById(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void>{
    try{
        const profesor = await Profesor.findById();
       
        if(!profesor){
            res.status(400).json({ error: 'Profesor not found'})
        }

        res.json(profesor)
    } catch (error){
        next(error)
    }
    
}

export async function getProfesorsByDni(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void>{
    try{
        const profesor = await Profesor.findById();
       
        if(!profesor){
            res.status(400).json({ error: 'Profesor not found'})
        }

        res.json(profesor)
    } catch (error){
        next(error)
    }
    
}