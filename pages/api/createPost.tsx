import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';

const prisma = new PrismaClient()

export default async function handle(req, res) {
    try {
        var { name, content, chat, author } = req.query;

        name = name.toString()

        const text = await prisma.text.create({
            data: {
                title: name,
                content: content,
                chat: {
                    connect: chat
                },
                author: {
                    connect: author
                },
                authorName: author.name,
                authorIcon: author.icon,
                authorId: author.id
            }
        });

        res.json(text);
    } catch (error) {
        res.json("error")
    }
}