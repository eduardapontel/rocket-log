import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';

class DeliveryLogsController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            delivery_id: z.string().uuid(),
            description: z.string(),
        });

        const { delivery_id, description } = bodySchema.parse(request.body);

        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id },
        });

        if (!delivery) {
            throw new AppError('Delivery not found', 404);
        }

        if (delivery.status === 'delivered') {
            throw new AppError('Delivery already delivered');
        }

        if (delivery.status === 'processing') {
            throw new AppError('Change status to shipped');
        }

        await prisma.deliveryLog.create({
            data: {
                delivery_id,
                description,
            },
        });
        return response.status(201).json();
    }

    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            delivery_id: z.string().uuid(),
        });

        const { delivery_id } = paramsSchema.parse(request.params);

        const delivery = await prisma.delivery.findUnique({
            where: { id: delivery_id },
            include: { user: true, logs: true },
        });

        if (request.user?.role === 'customer' && request.user.id !== delivery?.user_id) {
            throw new AppError('Unauthorized', 401);
        }

        return response.json(delivery);
    }
}

export { DeliveryLogsController };
