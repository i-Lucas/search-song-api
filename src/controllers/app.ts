import { Request, Response } from 'express';
import prisma from '../config/db.js';

async function visits(req: Request, res: Response) {

    const increment = req.query.increment === "true" ? true : false;
    
    if (increment) {

        await prisma.site.upsert({
            where: { id: 0 },
            update: { visits: { increment: 1 } },
            create: { id: 0, visits: 1 }
        });
    };

    const visits = await prisma.site.findUnique({ where: { id: 0 } });
    res.json(visits);
};

const app = { visits };
export default app;