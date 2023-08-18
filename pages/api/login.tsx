import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handle(req, res) {
    try {
        const { login, password } = req.query;

        console.log('Received login:', login);
        console.log('Received password:', password);

        const user = await prisma.user.findFirst({
            where: {
                OR: [{ name: login }, { email: login }],
                password: password,
            },
        });

        res.json(user);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred.' });
    }
}