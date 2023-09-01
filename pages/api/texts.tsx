import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handle(req, res) {
    try {
        const { id } = req.query;

        const texts = await prisma.text.findMany({
            where: {
                chat: {
                    id: id
                }
            }
        });

        res.json(texts);
    } catch (error) {
        res.json("error")
    }
}