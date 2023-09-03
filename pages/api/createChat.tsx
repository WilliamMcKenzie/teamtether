import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handle(req, res) {
    try {
        var { name, password, emails } = req.query;

        name = name.toString()
        password = password.toString()
        emails = emails.toString()

        const chat = await prisma.chat.create({
            data: {
                name: name,
                password: password
            }
        });

        if (emails.length == 0) {

        } else {

            var emailsArray = []
            emails = emails.replace(" ", "")

            emails = emails.split(",")

            for (let i = 0; i < emails.length; i++) {
                emailsArray.push({
                    email: emails[i]
                });
            }


            await prisma.chat.update({
                where: {
                    id: chat.id
                },
                data: {
                    users: {
                        connect: emailsArray
                    }
                }
            })
        }


        res.json(chat);
    } catch (error) {
        res.json("error")
    }
}