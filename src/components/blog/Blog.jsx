import React from 'react'
import styles from './blog.module.css'
import CommentSection from '../comments/CommentSection'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

const Blog = async ({ post }) => {
    return (
        <div className={styles.container}>
            <div className={styles.post}>
                <h1>{post?.title}</h1>
                <div className={styles.imgContainer}>
                    <Image src={post.img} fill />
                </div>
                <div className={styles.meta}>
                    <div className={styles.authorProfile}>
                        <Image src={post?.user?.image} fill />
                    </div>
                    <span>{post?.user?.name}</span>
                    <span>{" • "}</span>
                    <span>{post?.createdAt && formatDistanceToNow(post?.createdAt)}</span>
                </div>
                {post && <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{ __html: post?.desc }}
                />}
            </div>
            <div className={styles.comments}>
                <CommentSection postSlug={post.slug} />
            </div>
        </div>
    )
}

export default Blog
