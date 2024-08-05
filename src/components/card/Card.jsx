import React from 'react'
import styles from './card.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

const Card = ({ item, key }) => {
    return (
        <div key={key} className={styles.container}>
            <Link href={`/blogs/${item.slug}`} className={styles.imgContainer}>
                <Image src={item.img} fill />
            </Link>
            <div className={styles.content}>
                <p>
                    <span style={{ textTransform: "capitalize" }}>{formatDistanceToNow(new Date(item.createdAt))}</span>
                    <span>{' - '}</span>
                    <Link style={{ textTransform: "uppercase" }} href={`/blogs/?category=${item.catSlug}`}>{item.cat.title}</Link>
                </p>
                <Link href={`/blogs/${item.slug}`}>
                    <h1>{item.title}</h1>
                </Link>
                <Link href={`/blogs/${item.slug}`}>
                    <p>{item.desc}</p>
                </Link>
                <Link className={styles.readmore} href={`/blogs/${item.slug}`}>
                    Read More
                </Link>
            </div>
        </div>
    )
}

export default Card
