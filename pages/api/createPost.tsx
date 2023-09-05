import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';

const prisma = new PrismaClient()

export default async function handle(req, res) {
    try {
        var { name, content, chat, author } = req.query;

        chat = JSON.parse(chat.toString())
        author = JSON.parse(author.toString())

        const text = await prisma.text.create({
            data: {
                title: name,
                content: content,
                likes: 0,
                chat: {
                    connect: {
                        id: chat.id
                    }
                },
                author: {
                    connect: {
                        id: author.id
                    }
                }
            }
        });

        res.json(text);
    } catch (error) {
        res.json(error)
    }
}