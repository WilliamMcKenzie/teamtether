import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handle(req, res) {
    try {
        const { id, likes } = req.query;

        const text = await prisma.text.update({
            where: {
                id: id
            },
            data: {
                likes: likes - 1
            },
        })

        res.json(text);
    } catch (error) {
        res.json("error")
    }
}