import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handle(req, res) {
    try {
        const { id } = req.query;

        const user = await prisma.user.findFirst({
            where: {
                id: id
            },
        });

        res.json(user);
    } catch (error) {
        res.json("error")
    }
}