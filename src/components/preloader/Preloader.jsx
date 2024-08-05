import React from 'react'
import styles from './preloader.module.css'
import Image from 'next/image'

const Preloader = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={'/preloader.gif'} fill />
            </div>
        </div>
    )
}

export default Preloader
