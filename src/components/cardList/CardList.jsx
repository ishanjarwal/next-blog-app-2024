import React from 'react'
import styles from './cardList.module.css'
import Pagination from '../pagination/Pagination'
import Card from '../card/Card'


const CardList = async ({ posts, page, category, count }) => {

    const POST_PER_PAGE = 2;
    const title = category ? category + " Posts" : "Recent Posts"
    const hasPrev = POST_PER_PAGE * (page - 1) > 0;
    const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.content}>
                {posts?.map((item, idx) => (
                    <Card key={idx} item={item} />
                ))}
            </div>
            <Pagination hasPrev={hasPrev} hasNext={hasNext} page={page} />
        </div>
    )
}

export default CardList
