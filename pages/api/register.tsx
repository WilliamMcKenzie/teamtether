import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handle(req, res) {
    try {
        const { name, email, password } = req.query;

        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            },
        });

        res.json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
}