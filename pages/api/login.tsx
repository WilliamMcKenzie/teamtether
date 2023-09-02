import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

// export default async function handle(req, res) {
//     try {
//         const { login, password } = req.query;

//         const user = await prisma.user.findFirst({
//             where: {
//                 OR: [{ name: login }, { email: login }],
//                 password: password,
//             },
//         });

//         res.json(user);
//     } catch (error) {
//         res.json("error")
//     }
// }

export default async function handle(req, res) {
    try {
        const { login, password } = req.query;

        const user = await prisma.user.findFirst({
            where: {
                OR: [{ name: login }, { email: login }],
                password: password,
            },
        });

        res.json(user);
    } catch (error) {
        res.json(error)
    }
}