import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
     const userId = req.userId;

     // ADD this null check 
     if(!userId) {
        return res.status(401).json({ error: 'User not authenticated'});
     }

     const user = await prisma.user.findUnique({
        where: { id: userId},
        select: {
            id: true,
            email: true,
            status: true,
            createdAt: true,
            updatedAt: true
        }
     });

     if (!user) {
        return res.status(404).json({ error: 'User not found'});
     }

     res.status(200).json({ user });
    } catch(error: any) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Internal server error'});
    }
});

export default router;