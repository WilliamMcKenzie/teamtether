import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handle(req, res) {
    try {
        const { name, email, password } = req.query;

        const chat = await prisma.chat.findMany({
            where: {
                users: {
                    some: {
                        name: name,
                        email: email,
                        password: password
                    }
                }
            },
            include: {
                users: true,
            },
        });

        res.json(chat);
    } catch (error) {
        res.json("error")
    }
}