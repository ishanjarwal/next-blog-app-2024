import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page");
    const category = searchParams.get("category");
    const POST_PER_PAGE = 2;
    const query = {
        where: {
            ...(category && { catSlug: category }),
        },
        ...(page && { take: POST_PER_PAGE, }),
        ...(page && { skip: (page - 1) * POST_PER_PAGE, }),
        include: {
            cat: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    }
    try {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({ where: query.where })
        ]);
        return new NextResponse(JSON.stringify({ posts, count, POST_PER_PAGE }), { status: 200 })
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 })
    }
}


export const POST = async (req) => {
    const session = await getAuthSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated" }), { status: 401 })
    }
    const body = await req.json();
    const category = await prisma.category.findUnique({ where: { slug: body.catSlug } })
    if (!category) {
        return new NextResponse(JSON.stringify({ message: "Invalid Category" }), { status: 401 })
    }
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) {
        return new NextResponse(JSON.stringify({ message: "Invalid User" }), { status: 401 })
    }
    try {
        const post = await prisma.post.create({
            data: {
                ...body,
                userEmail: session.user.email
            }
        });
        return new NextResponse(JSON.stringify({ post }), { status: 200 })
    } catch (err) {
        console.log(err);
        return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 })
    }
}
