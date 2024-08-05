import React from 'react'
import styles from './blog.module.css'
import Blog from '@/components/blog/Blog'
import Menu from '@/components/menu/Menu'
import { redirect } from 'next/navigation'
import axios from 'axios'

const getData = async (slug) => {
    try {
        const res = await axios.get(`http://localhost:3000/api/posts/${slug}`, { headers: { 'cache': "no-store", } });
        if (res.status != 200) {
            return { redirector: "/error" }
        }
        return res.data;
    } catch (error) {
        return { redirector: "/error" }
    }
}


export async function generateMetadata({ params }) {
    const { slug } = params;
    const { post, redirector } = await getData(slug);
    if (redirector) {
        return {
            title: 'Error',
            description: 'Error fetching post data'
        };
    }
    return {
        title: post.title,
        description: post.desc,
    };
}

const Page = async ({ params }) => {
    const { slug } = params;
    const { post, redirector } = await getData(slug);
    if (redirector) {
        redirect(redirector)
    }
    return (
        <div className={styles.main}>
            <Blog post={post} />
            <Menu />
        </div>
    )
}

export default Page
