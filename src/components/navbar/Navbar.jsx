import React from 'react'
import styles from './navbar.module.css'
import ThemeToggle from '../themeToggle/ThemeToggle'
import Image from 'next/image'
import AuthLinks from '../authLinks/AuthLinks'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.social}>
                <Image src={'/facebook.png'} alt='facebook' width={24} height={24} />
                <Image src={'/instagram.png'} alt='instagram' width={24} height={24} />
                <Image src={'/tiktok.png'} alt='tiktok' width={24} height={24} />
                <Image src={'/youtube.png'} alt='youtube' width={24} height={24} />
            </div>
            <div className={styles.logo}>
                <h1>
                    <span>NEXT</span>
                    <br />
                    <span>BLOG</span>
                    <br />
                    <span>APP.</span>
                </h1>
            </div>
            <div className={styles.links}>
                <ThemeToggle />
                <Link className={styles.link} href={'/'}>Home</Link>
                <Link className={styles.link} href={'/'}>About</Link>
                <Link className={styles.link} href={'/'}>Contact</Link>
                <AuthLinks />
            </div>
        </div>
    )
}

export default Navbar
