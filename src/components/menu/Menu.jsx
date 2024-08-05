import React from 'react'
import styles from './menu.module.css'
import Image from 'next/image'
import Link from 'next/link'

const Menu = () => {

    const categories = [
        {
            name: "Style",
            color: "#ffe3e3",
            href: "/",
            img: '/style.png'
        },
        {
            name: "Fashion",
            color: "#e8ffe3",
            href: "/",
            img: '/fashion.png'
        },
        {
            name: "Food",
            color: "#e3e7ff",
            href: "/",
            img: '/food.png'
        },
        {
            name: "Travel",
            color: "#ffe3f6",
            href: "/",
            img: '/travel.png'
        },
        {
            name: "Culture",
            color: "#e3fff2",
            href: "/",
            img: '/culture.png'
        },
        {
            name: "Coding",
            color: "#ffe3f1",
            href: "/",
            img: '/coding.png'
        }
    ]


    return (
        <div className={styles.container}>
            <div className={styles.blogList}>
                <h2>Whats Hot</h2>
                <h1>Most Popular</h1>
                <div className={styles.content}>
                    <div className={styles.listitem}>
                        <Link href={'/'} className={styles.imgContainer}>
                            <Image src={"/p1.jpeg"} fill />
                        </Link>
                        <div className={styles.listDetails}>
                            <Link className={styles.category} href={'/'}>Coding</Link>
                            <Link href={'/'}>
                                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, tempore.</h1>
                            </Link>
                            <p>
                                <span>Author</span>
                                <span>{" - "}</span>
                                <span>{"11th July 2024"}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.categories}>
                <h2>Explore More</h2>
                <h1>Categories</h1>
                <div className={styles.content}>
                    {categories.map((item, idx) => (
                        <Link key={idx} className={styles.listitem} style={{ backgroundColor: item.color }} href={item.href} >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div style={{ marginTop: "60px" }} className={styles.blogList}>
                <h2>Top</h2>
                <h1>Editors Picks</h1>
                <div className={styles.content}>
                    <div className={styles.listitem}>
                        <Link href={'/'} className={styles.imgContainer}>
                            <Image src={'/p1.jpeg'} fill />
                        </Link>
                        <div className={styles.listDetails}>
                            <Link className={styles.category} href={'/'}>Coding</Link>
                            <Link href={'/'}>
                                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, tempore.</h1>
                            </Link>
                            <p>
                                <span>Author</span>
                                <span>{" - "}</span>
                                <span>{"11th July 2024"}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu
