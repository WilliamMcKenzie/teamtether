import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handle(req, res) {
    try {
        const { name, email, password, icon, newName, newEmail, newPassword, newIcon } = req.query;

        const user = await prisma.user.update({
            where: {
                name: name,
                email: email,
                password: password,
                icon: icon
            },
            data: {
                name: newName,
                email: newEmail,
                password: newPassword,
                icon: newIcon
            },
        })

        res.json(user);
    } catch (error) {
        res.json("error")
    }
}