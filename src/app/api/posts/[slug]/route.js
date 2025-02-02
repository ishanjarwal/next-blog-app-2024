import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { slug } = params;

    try {
        const post = await prisma.post.findUnique({ where: { slug }, include: { user: true, cat: true } });
        if (!post) {
            return new NextResponse(JSON.stringify({ message: "Post not found" }), { status: 400 });
        }
        return new NextResponse(JSON.stringify({ post }, { status: 200 }));
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong" }, { status: 500 }))
    }
}
