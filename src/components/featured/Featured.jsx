import React from 'react'
import styles from './featured.module.css'
import Image from 'next/image'

const Featured = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <b>Lorem ipsum</b> dolor sit amet consectetur adipisicing
            </h1>
            <div className={styles.post}>
                <div className={styles.imageContainer}>
                    <Image src={'/p1.jpeg'} className={styles.image} alt='featured_image' fill />
                </div>
                <div className={styles.content}>
                    <h1 className={styles.postTitle}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id, exercitationem.
                    </h1>
                    <p className={styles.postDesc}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa, explicabo. Rerum iure quam eum ex debitis omnis aspernatur natus impedit. Quam voluptas eveniet est aperiam maxime non impedit assumenda excepturi!</p>
                    <button className={styles.postButton}>Read More</button>
                </div>
            </div>
        </div>
    )
}

export default Featured
