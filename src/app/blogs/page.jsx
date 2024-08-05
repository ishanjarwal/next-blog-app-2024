import React from 'react'
import styles from './blogs.module.css'
import CardList from '@/components/cardList/CardList'
import Menu from '@/components/menu/Menu'
import axios from 'axios';
import { redirect } from 'next/navigation';


export async function generateMetadata({ searchParams }) {
    const { category } = searchParams;
    return {
        title: category + " posts",
        description: category + " related posts",
    };
}

const getData = async (page, category = "") => {
    try {
        const res = await axios.get(`http://localhost:3000/api/posts?page=${page}&category=${category}`, { headers: { cache: "no-store" } });
        if (res.status != 200 || res.data?.count <= 0) {
            return { redirector: "/error" }
        }
        return res.data;
    } catch (error) {
        return { redirector: "/error" }
    }
}

const Page = async ({ searchParams }) => {

    const page = parseInt(searchParams?.page) || 1;
    const { category } = searchParams;
    const { posts, count, POST_PER_PAGE, redirector } = await getData(page, category);
    if (redirector) {
        redirect(redirector);
    }

    return (
        <div className={styles.main}>
            <CardList posts={posts} count={count} page={page} category={category || ""} />
            <Menu />
        </div>
    )
}

export default Page
