import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handle(req, res) {
    try {
        const { name, email, password, icon } = req.query;

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                icon: icon
            },
        });

        res.json(user);
    } catch (error) {
        res.json(error)
    }
}