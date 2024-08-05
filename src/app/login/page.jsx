"use client"
import React from 'react'
import styles from './login.module.css'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Preloader from '@/components/preloader/Preloader'

const Page = () => {

    const router = useRouter();
    const { data, status } = useSession();

    if (status === 'authenticated') {
        router.push("/");
    }

    return (
        <>
            {(status == "loading" || status == "authenticated")
                ?
                <Preloader />
                :
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <button
                            style={{ backgroundColor: "#ffffff", color: "#007DF3" }} className={styles.btn}
                            onClick={() => { signIn("google") }}
                        >
                            <span><FcGoogle /></span>
                            <span>Sign In with Google</span>
                        </button>
                        <button
                            style={{ backgroundColor: "#ffffff", color: "#000" }} className={styles.btn}
                            onClick={() => { signIn("github") }}
                        >
                            <span><FaGithub /></span>
                            <span>Sign In with Github</span>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}

export default Page
