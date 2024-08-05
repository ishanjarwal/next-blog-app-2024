"use client"
import React, { useContext } from 'react'
import styles from './themeToggle.module.css'
import Image from 'next/image'
import { ThemeContext } from '@/context/ThemeContext'

const ThemeToggle = () => {

    const { theme, toggle } = useContext(ThemeContext);

    return (
        <div className={styles.container} style={theme === 'light' ? { backgroundColor: '#000' } : { backgroundColor: '#fff' }} onClick={toggle}>
            <Image src={'/sun.png'} alt='sun' width={14} height={14} />
            <div className={styles.ball} style={theme === 'light' ? { left: 2, backgroundColor: '#fff' } : { right: 2, backgroundColor: '#000' }}></div>
            <Image src={'/moon.png'} alt='moon' width={14} height={14} />
        </div>
    )
}

export default ThemeToggle
