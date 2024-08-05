import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


export const GET = async (req, { params }) => {
    const { postSlug } = params;
    try {
        const comments = await prisma.comment.findMany({
            where: { postSlug },
            include: { user: true },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return new NextResponse(JSON.stringify(comments, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong, Comments not fetched" }, { status: 500 }))
    }
}

export const POST = async (req, { params }) => {
    const session = await getAuthSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated" }, { status: 401 }))
    }
    const { postSlug } = params;
    try {
        const { comment } = await req.json();
        const post = await prisma.post.findUnique({ where: { slug: postSlug } });
        if (!post) {
            return new NextResponse(JSON.stringify({ message: "Invalid Post" }), { status: 400 });
        }
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "Invalid User" }), { status: 400 });
        }
        const data = await prisma.comment.create({
            data: {
                desc: comment,
                userEmail: session.user.email,
                postSlug
            }
        });
        return new NextResponse(JSON.stringify(data, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong, Comments not fetched" }, { status: 500 }))
    }
}