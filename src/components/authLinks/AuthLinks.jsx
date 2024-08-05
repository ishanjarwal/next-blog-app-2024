"use client"
import React, { useState } from 'react'
import styles from './authLinks.module.css'
import Link from 'next/link'
import { IoMdMenu } from "react-icons/io";
import { signOut, useSession } from 'next-auth/react';
const AuthLinks = () => {

    const [open, setOpen] = useState(false);
    const { status } = useSession();
    return (
        <>
            {status === "unauthenticated" ? (
                <Link className={styles.link} href={'/login'}>Login</Link>
            ) : (
                <>
                    <Link href={'/write'}>Write</Link>
                    <span
                        className={styles.link}
                        onClick={() => { signOut() }}
                    >Logout</span>
                </>
            )}
            <button className={styles.hamburger} onClick={() => { setOpen(prev => !prev) }}>
                <IoMdMenu />
            </button>
            {open && (
                <div className={styles.responsiveLinks}>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/'}>About</Link>
                    <Link href={'/'}>Contact</Link>
                    {status === "notauthenticated" ? (
                        <Link href="/login">Login</Link>
                    ) : (
                        <>
                            <Link href="/write">Write</Link>
                            <button
                                className={styles.link}
                                onClick={() => { signOut }}
                            >Logout</button>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default AuthLinks
