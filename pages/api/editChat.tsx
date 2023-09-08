import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handle(req, res) {
    try {
        const { name, password, id } = req.query;

        const chat = await prisma.chat.update({
            where: {
                id: id
            },
            data: {
                name: name,
                password: password
            },
        })

        res.json(chat);
    } catch (error) {
        res.json(error)
    }
}