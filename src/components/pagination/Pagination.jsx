"use client"
import React from 'react'
import styles from './pagination.module.css'
import { useRouter } from 'next/navigation'
const Pagination = ({ page, hasPrev, hasNext }) => {

    const router = useRouter();

    return (
        <div className={styles.container}>
            <button
                disabled={!hasPrev}
                onClick={() => {
                    router.push(`?page=${page - 1}#main`);
                }}
                className={styles.btn}>
                Previous
            </button>
            <button
                disabled={!hasNext}
                onClick={() => {
                    router.push(`?page=${page + 1}#main`);
                }}
                className={styles.btn}>
                Next
            </button>
        </div>
    )
}

export default Pagination
