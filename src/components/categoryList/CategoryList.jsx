import React from 'react'
import styles from './categoryList.module.css'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'

const getData = async () => {
    const res = await axios.get('http://localhost:3000/api/category');
    if (res.status != 200) {
        throw new Error("Category fetch failed");
    }
    return res.data;
}

const CategoryList = async () => {

    const categories = await getData();

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                Popular Categories
            </h1>
            <div className={styles.categories}>
                {categories?.map((item, idx) => (
                    <Link key={item._id} href={'/'} className={styles.category} >
                        <Image src={item.img} width={64} height={64} />
                        <span>
                            {item.title}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryList
