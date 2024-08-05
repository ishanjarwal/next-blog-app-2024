"use client"
import React, { useState } from 'react'
import styles from './commentSection.module.css'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import axios from 'axios'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const fetcher = async (url) => {
    const res = await axios.get(url);
    if (res.status != 200) {
        const error = new Error(data.message);
        throw error;
    }
    return res.data;
};

const CommentSection = ({ postSlug }) => {
    const { status } = useSession();
    const { data, mutate, isLoading } = useSWR(
        `http://localhost:3000/api/comment/${postSlug}`,
        fetcher
    );
    const [comment, setComment] = useState("");
    const handleSubmit = async () => {
        setComment("");
        const res = await axios.post(`http://localhost:3000/api/comment/${postSlug}`, JSON.stringify({ comment }))
        mutate();
    }
    return (
        <div className={styles.container}>
            <h2>Add a Comment</h2>
            {status === 'authenticated' ?
                <div className={styles.formContent}>
                    <textarea placeholder='Add you comment' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                    <button
                        onClick={handleSubmit}
                        className={styles.submit}
                    >
                        Add
                    </button>
                </div>
                :
                <Link href={'/login'} >Login to comment on this post.</Link>
            }
            <div className={styles.comments}>
                {isLoading ? "loading. . ." : data?.map((comment, index) => (
                    <div key={index} className={styles.content}>
                        <div className={styles.author}>
                            <div className={styles.imgContainer}>
                                <Image src={comment?.user.image} fill />
                            </div>
                            <span>{comment?.user.name}</span>
                            <span>{" • "}</span>
                            <span>{comment && formatDistanceToNow(comment.createdAt)}</span>
                        </div>
                        <p>{comment?.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CommentSection
